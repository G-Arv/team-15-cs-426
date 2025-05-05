import express from 'express';
import { pino } from 'pino';
import fs from 'fs';
import { Request, Response } from 'express';

// Create log directory if it doesn't exist
fs.mkdirSync("./logs", { recursive: true });

const PORT = 3000;
const REGISTRY_URL = 'http://registry:3000';

// Set up pino to log to both console and file
const log = pino({
  transport: {
    targets: [
      { target: 'pino-pretty', level: 'info' },
      { target: 'pino/file', options: { destination: './logs/service-d.log' }, level: 'info' }
    ]
  }
});

const app = express();
app.use(express.json());

// Retry logic to register with registry
async function registerWithRetry(name: string, url: string, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(`${REGISTRY_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      log.info('Successfully registered with registry');
      return;
    } catch (err) {
      log.warn(`Register attempt ${i + 1} failed: ${(err as Error).message}`);
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error('Failed to register after multiple attempts. Exiting.');
  process.exit(1);
}

async function lookupService(name: string): Promise<string | null> {
  try {
    const res = await fetch(`${REGISTRY_URL}/lookup?name=${name}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { url } = await res.json();
    return url;
  } catch (err) {
    log.error(`Service lookup failed for ${name}: ${(err as Error).message}`);
    return null;
  }
}

// Handle request from API Gateway
app.post('/', async (req: Request, res: Response) => {
  
  log.info({ source: 'gateway', body: req.body }, 'Received request from api-gateway');

  // TODO: Lookup and contact another service, e.g., service-c
  // TODO: Combine data with some local logic

  const response = {
    from: 'service-d',
    received: req.body,
    timestamp: new Date().toISOString()
  };

  res.json(response);
});

// Handle request from service-b
app.post('/from-b', async (req: Request, res: Response) => {
  log.info({ source: 'service-b', body: req.body }, 'Received request from service-b');

  // TODO: Process enrichedData, maybe fetch from registry or another service
  const response = {
    from: 'service-d',
    received: req.body,
    notes: 'Processed request from service-b',
    timestamp: new Date().toISOString()
  };

  res.json(response);
});

app.listen(PORT, () => {
  log.info(`Service D listening on port ${PORT}`);
  registerWithRetry('service-d', `http://service-d:${PORT}`);
});

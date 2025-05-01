// TODO: edit to change requests 
const GATEWAY = 'http://localhost:3000';

async function sendRequest(path: string, message: string) {
  const url = `${GATEWAY}${path}`;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'requests', message })
    });

    if (res.ok) {
      const data = await res.json();
      const end = Date.now();
      console.log(`\n✅ ${path} (${res.status}) in ${end - start}ms`);
      console.log(JSON.stringify(data, null, 2));
    }
    else {
      console.error(`\n❌ Request to ${path} failed: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error(`\n❌ Request to ${path} failed: ${(err as Error).message}`);
  }
}

async function main() {
  await sendRequest('/a', 'hello from /a');
  await sendRequest('/b', 'hello from /b');
  await sendRequest('/d', 'hello from /d');
}

main();


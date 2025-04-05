import { StrictMode } from 'react'
import './index.css'
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render(
      <StrictMode>
        <RouterProvider router={routes} />
      </StrictMode>
    );

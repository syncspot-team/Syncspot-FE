import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './app/styles/global.css';
import { initSentry } from './shared/utils';

/* Sentry 초기화 */
initSentry();

createRoot(document.getElementById('root')!).render(<App />);

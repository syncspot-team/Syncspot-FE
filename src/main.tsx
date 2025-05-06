import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';
import { initSentry } from './utils/sentry';

/* Sentry 초기화 */
initSentry();

createRoot(document.getElementById('root')!).render(<App />);

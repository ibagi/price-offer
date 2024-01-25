import './styles/app.css';

import App from './App.svelte';
import { restoreState } from './lib/state';

restoreState();

const app = new App({
  target: document.getElementById('app')!,
});

export default app;

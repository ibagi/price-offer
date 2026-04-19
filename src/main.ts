import './styles/app.css';

import App from './App.svelte';
import { restoreState } from './state';
import { mount } from "svelte";

restoreState();

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;

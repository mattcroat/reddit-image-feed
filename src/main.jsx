import React, { StrictMode } from '@pika/react';
import { render } from '@pika/react-dom';

import App from './App';

import '/@css/styles.css';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app'),
);

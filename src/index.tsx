import React from 'react';
import { createRoot } from 'react-dom/client';

import Router from './Route/Router';

import reportWebVitals from './reportWebVitals';

import './assets/styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Router />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

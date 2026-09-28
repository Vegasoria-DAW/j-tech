import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './styles/variables.css';
import './styles/global.css';
import { applyTheme, getInitialTheme } from './hooks/useTheme';

applyTheme(getInitialTheme());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

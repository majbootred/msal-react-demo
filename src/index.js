import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './styles/theme';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth: {
    clientId: 'c66a6ab8-e6a0-4d6e-9aac-ec9cdfcf29e1',
    authority: 'https://login.microsoftonline.com/ba467cc2-4392-418d-a733-5d39629c3481',
    redirectUri: '/',
  },
  cache: { cacheLocation: 'localStorage', storeAuthStateInCookie: false },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPII) => {
        console.log(message);
      },
      logLevel: 'Info',
    },
  },
});

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca} />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

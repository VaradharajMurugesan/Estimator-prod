import { CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID,
    authority: process.env.REACT_APP_AZURE_AD_AUTHORITY,
    redirectUri: process.env.REACT_APP_AZURE_AD_REDIRECT_URI, // Your app's redirect URI
  },
  cache: {
    cacheLocation: 'sessionStorage', // Or 'localStorage'
    storeAuthStateInCookie: false,
  },
};

export default msalConfig;

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <CssBaseline />
      <MsalProvider instance={new PublicClientApplication(msalConfig)}>
        <App />
      </MsalProvider>
    </BrowserRouter>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

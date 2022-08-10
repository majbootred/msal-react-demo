import Grid from '@mui/material/Grid';
import { PageLayout } from './components/PageLayout';
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { MsalProvider, useMsal, useIsAuthenticated } from '@azure/msal-react';
import {InteractionRequiredAuthError} from '@azure/msal-browser';
import { useEffect } from 'react';

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <Grid container justifyContent='center'>
          <Pages />
        </Grid>
      </PageLayout>
    </MsalProvider>
  );
}

const Pages = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      instance
        .ssoSilent({
          scopes: ['user.read'],
          loginHint: '',
        })
        .then((response) => {
          instance.setActiveAccount(response.account);
        })
        .catch((err) => {
          if (err instanceof InteractionRequiredAuthError) {
            instance.loginRedirect({
                scopes: ['user.read']
              });
          }
        });
    }
  }, [instance,isAuthenticated]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  );
};

export default App;

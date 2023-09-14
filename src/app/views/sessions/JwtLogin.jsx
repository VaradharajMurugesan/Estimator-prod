import { useMsal, useIsAuthenticated, useMsalAuthentication } from '@azure/msal-react';
//import { InteractionStatus } from '@azure/msal-browser';
import { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Card, Grid } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import useAuth from 'app/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#ffffff',
  minHeight: '100% !important',
  flexDirection: 'column',
  '& .card': {
    maxWidth: 500,
    minHeight: 200,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
    borderBottom: '6px solid #FD7744;',
  },
}));

// inital login credentials
const initialValues = {
  email: 'admin@estimator.com',
  password: 'dummyPass',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtLogin = () => {
  const theme = useTheme();
  const { instance, accounts, loginPopup, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const authresults = useMsalAuthentication();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { login, getPermissions } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  const initializeSignIn = () => {
    const loginRequest = {
      scopes: [process.env.REACT_APP_AZURE_AD_SCOPES],
    };

    if (!isAuthenticated) {
      setLoading(true);
    }

    try {
      instance
        .loginPopup(loginRequest)
        .then((res) => {
          if (res) {
            setLoading(true);
            afterLogin(res);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!isAuthenticated && inProgress === InteractionStatus.None) {
  //     // instance.loginPopup();
  //   }
  // }, [isAuthenticated, inProgress, instance]);

  const afterLogin = async (res) => {
    await login(res);
    await getPermissions(res.accessToken);

    setLoading(false);
    navigate('/');
  };

  return (
    <JWTRoot>
      <FlexBox p={4} height="100%" sx={{ minWidth: 320 }}>
        <img src="/assets/app-images/emergere_logo.svg" alt="" />
      </FlexBox>
      <Card className="card">
        <Grid container>
          <Grid item sm={12} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/app-images/estimator_logo.svg" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={12} xs={12}>
            <ContentBox>
              <LoadingButton
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
                onClick={initializeSignIn}
                sx={{ my: 2, width: '100%' }}
              >
                Azure Active Directory Login
              </LoadingButton>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;

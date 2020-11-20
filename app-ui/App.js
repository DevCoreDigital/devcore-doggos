import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import {
  COGNITO_REGION,
  COGNITO_USER_POOL_ID,
  COGNITO_USER_POOL_WEB_CLIENT,
  API_NAME,
  API_ENDPOINT,
  COGNITO_DOMAIN,
  COGNITO_REDIRECT_SIGN_IN,
  COGNITO_REDIRECT_SIGN_OUT,
  COGNITO_IDENTITY_POOL_ID
} from '@env';

import Amplify, { Auth, Hub } from 'aws-amplify';
import Dashboard from './components/Dashboard';
import AuthView from './components/AuthView';
import * as WebBrowser from 'expo-web-browser';

/**
 * Configure Amplify to hook up with the Cognito Pool and API Gateway that was
 * deployed via the 'api'. You can replace these variables in the .env files.
 *
 * REQUIRED FOR Social Logins ONLY
 */
const oauth = {
  domain: COGNITO_DOMAIN,
  scope: [
    'phone',
    'email',
    'profile',
    'openid',
    'aws.cognito.signin.user.admin'
  ],
  redirectSignIn: COGNITO_REDIRECT_SIGN_IN,
  redirectSignOut: null, // COGNITO_REDIRECT_SIGN_OUT
  responseType: 'code',
  urlOpener: async (url, redirectUrl) => {
    // On Expo, use WebBrowser.openAuthSessionAsync to open the Hosted UI pages.
    if (redirectUrl) {
      const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
        url,
        redirectUrl
      );
      if (type === 'success') {
        await WebBrowser.dismissBrowser();

        if (Platform.OS === 'ios') {
          return Linking.openURL(newUrl);
        }
      }
    }
  }
};

Amplify.configure({
  Auth: {
    // Amazon Cognito Region
    region: COGNITO_REGION,
    // Amazon Cognito User Pool ID
    userPoolId: COGNITO_USER_POOL_ID,
    // Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: COGNITO_USER_POOL_WEB_CLIENT,
    // REQUIRED FOR Social Logins ONLY
    identityPoolId: COGNITO_IDENTITY_POOL_ID,
    // REQUIRED FOR Social Logins ONLY
    oauth
  },
  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint: API_ENDPOINT,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`
          };
        }
      }
    ]
  }
});

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let updateUser = async (/*authState*/) => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    Hub.listen('auth', updateUser); // listen for auth events (login, signup, signout);
    updateUser(); // check manually the first time
    return () => Hub.remove('auth', updateUser); // cleanup listener
  }, []);

  return (
    <View style={styles.container}>{user ? <Dashboard /> : <AuthView />}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%', // or flex: 1
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

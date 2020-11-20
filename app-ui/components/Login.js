import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Auth } from 'aws-amplify';
import googleLogo from '../assets/btn_google_signin_light_normal_web.png';

import inputStyles from '../styles/inputs';
import WhiteButton from './WhiteButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);

  const signIn = useCallback(async (email, password, setShowLoginError) => {
    setShowLoginError(false);

    if (email && password) {
      try {
        await Auth.signIn(email, password);
      } catch (error) {
        console.log('error signing in', error);
        setShowLoginError(true);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={inputStyles.fieldLbl}>Email</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        value={email}
      />
      <Text style={inputStyles.fieldLbl}>Password</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {showLoginError && (
        <Text style={{ color: 'red' }}>Incorrect email or password.</Text>
      )}
      <WhiteButton
        text="Sign in"
        func={async () => {
          await signIn(email, password, setShowLoginError);
        }}
      />
      <TouchableOpacity
        style={{
          marginTop: 20,
          width: 195,
          alignSelf: 'center'
        }}
        onPress={() => Auth.federatedSignIn({ provider: 'Google' })}>
        <Image
          source={googleLogo}
          style={{ alignSelf: 'center', width: 200, resizeMode: 'contain' }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  textInput: {
    padding: 5,
    marginBottom: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

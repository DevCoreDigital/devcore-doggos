import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Auth } from 'aws-amplify';
import WhiteButton from './WhiteButton';

import inputStyles from '../styles/inputs';

export default function SignUp({ backToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [showVerification, setShowVerification] = useState(false);
  const [showValidation, setShowValidation] = useState(false); // TODO

  const signUp = useCallback(async (email, password) => {
    if (email && password) {
      setShowValidation(false);

      try {
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            email
          }
        });
        setShowVerification(true);
      } catch (error) {
        console.log('error signing up:', error);
        setShowValidation(true);
      }
    }
  }, []);

  const submitVerification = useCallback(async (email, verificationCode) => {
    try {
      await Auth.confirmSignUp(email, verificationCode);
      backToLogin();
    } catch (error) {
      console.log('error signing up:', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      {showVerification ? (
        <React.Fragment>
          <Text style={inputStyles.fieldLbl}>
            We've sent a verification code to your email address.
          </Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(text) => setVerificationCode(text)}
            value={verificationCode}
          />
          <WhiteButton
            text="Submit"
            func={async () => await submitVerification(email, verificationCode)}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
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
          {showValidation && (
            <Text style={{ color: 'red' }}>
              A valid email and password is required.
            </Text>
          )}
          <WhiteButton
            text="Sign Up"
            func={async () => await signUp(email, password)}
          />
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40
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

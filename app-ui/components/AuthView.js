import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import SignUp from './SignUp';
import Login from './Login';

export default function AuthView() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRegisterMessage, setShowRegisterMessage] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showSignUp ? (
          <View style={styles.viewContainer}>
            <SignUp
              backToLogin={() => {
                setShowRegisterMessage(true);
                setShowSignUp(false);
              }}
            />
            <Button
              title="Back to Login"
              onPress={() => setShowSignUp(false)}
            />
          </View>
        ) : (
          <View style={styles.viewContainer}>
            {showRegisterMessage && (
              <Text style={{ marginBottom: 10, color: 'green' }}>
                Your account has been created, please sign in!
              </Text>
            )}
            <Login />
            <Button
              title="Need an account?"
              onPress={() => setShowSignUp(true)}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  viewContainer: {
    padding: 20
  }
});

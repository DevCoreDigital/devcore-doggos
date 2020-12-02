import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { API, Auth } from 'aws-amplify';
import { API_NAME } from '@env';

export default function Dashboard({}) {
  const [status, setStatus] = useState('Checking...');
  const [doggos, setDoggos] = useState({});
  const [doggosLoading, setDoggosLoading] = useState(false);

  const getHealth = useCallback(async () => {
    await API.get(API_NAME, '/health', {})
      .then((response) => {
        let status = response.healthy ? 'Healthy' : 'Unhealthy';
        setStatus(status);
      })
      .catch((error) => {
        setStatus('Unhealthy');
        console.log('error', error);
      });
  }, []);

  const loadDoggos = async () => {
    setDoggosLoading(true);
    API.post(API_NAME, '/findDoggos', {})
      .then((res) => {
        const doggoList = JSON.parse(res.body);
        setDoggos(doggoList);
        return res;
      })
      .catch((err) => {
        setStatus('Unhealthy');
      })
      .finally(() => {
        setDoggosLoading(false);
      });
  };

  const signOut = useCallback(async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }, []);

  useEffect(() => {
    getHealth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Server Health: {status}</Text>
      {doggosLoading ? (
        <Text>Loading doggos...</Text>
      ) : (
        <TouchableOpacity onPress={loadDoggos}>
          <Text>Get Doggos</Text>
        </TouchableOpacity>
      )}
      {!!Object.keys(doggos).length && (
        <FlatList
          data={Object.keys(doggos)}
          renderItem={({ item }) => {
            return (
              <Text style={styles.doggoName} key={doggos[item].animalId}>
                {doggos[item].animalName}
              </Text>
            );
          }}></FlatList>
      )}

      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
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
  },
  doggoName: {
    color: 'white'
  }
});

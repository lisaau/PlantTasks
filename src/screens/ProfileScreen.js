import React from 'react';
import jwtDecode from 'jwt-decode';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import AuthContext from '../context/AuthContext';

export default function ProfileScreen() {
  const { token, logout } = React.useContext(AuthContext);
  const userName = jwtDecode(token).given_name;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={styles.text}>Hello {userName}!</Text>
      <Image
        source={require('../../assets/cactus-icon.png')}
        style={styles.image}
      />
      <Button onPress={logout} title="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  },
  image: {
    marginBottom: '25%'
  }
});

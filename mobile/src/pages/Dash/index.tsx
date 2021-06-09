import React from 'react';
import { View, Button, Text } from 'react-native';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Sair" onPress={signOut} />
      </View>
      <Text>Bem-vindo!</Text>
    </>
  );
};

export default Dashboard;

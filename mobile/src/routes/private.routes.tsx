import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Dash from '../pages/Dash';

const Private = createStackNavigator();

const PrivateRoutes: React.FC = () => (
  <Private.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Private.Screen name="Dash" component={Dash} />
  </Private.Navigator>
);

export default PrivateRoutes;

//rotas privadas

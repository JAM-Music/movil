import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';

export type RootNavigationProps = {};
const Stack = createNativeStackNavigator();

const RootNavigation: React.FC<RootNavigationProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={() => <View />} name="index" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

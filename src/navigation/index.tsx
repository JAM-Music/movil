import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '_src/screens/Login';
import R from '_src/assets/R';
import Register from '_src/screens/Register';
import {useUser} from '_src/hooks';
import DashboardNavigation from './dashboard';

export type RootNavigationProps = {};
const Stack = createNativeStackNavigator();

const RootNavigation: React.FC<RootNavigationProps> = () => {
  const {isLoggedIn, checkSession} = useUser();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: R.colors.BG},
          headerShown: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen component={DashboardNavigation} name="dashboard" />
        ) : (
          <>
            <Stack.Screen component={Login} name="login" />
            <Stack.Screen component={Register} name="register" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

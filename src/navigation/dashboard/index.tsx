import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '_src/screens/Dashboard';
import R from '_src/assets/R';
import {Icon} from 'react-native-elements';
import Search from '_src/screens/Search';
import Profile from '_src/screens/Profile';

const Tab = createBottomTabNavigator();

const DashboardNavigation: FC<{}> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: 30,
          width: '95%',
          alignSelf: 'center',
          marginBottom: 20,
          backgroundColor: 'rgba(64, 64, 64,0.3)',
        },
        tabBarLabelStyle: {fontSize: 13},
        tabBarShowLabel: false,
        tabBarActiveTintColor: R.colors.SECONDARY,
        tabBarInactiveTintColor: R.colors.TEXT,
      }}
      sceneContainerStyle={{backgroundColor: R.colors.BG}}>
      <Tab.Screen
        name="home"
        component={Dashboard}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" tvParallaxProperties color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" tvParallaxProperties color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" tvParallaxProperties color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigation;

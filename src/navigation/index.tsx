import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '_src/screens/Login';
import R from '_src/assets/R';
import Register from '_src/screens/Register';
import {useUser} from '_src/hooks';
import DashboardNavigation from './dashboard';
import ArtistDetails from '_src/screens/ArtistDetails';
import Header from '_src/components/Header';
import {RootScreens} from '_src/utils/types/Screens';
import AlbumDetails from '_src/screens/AlbumDetails';
import PlaylistDetails from '_src/screens/PlaylistDetails';
import MusicPlayer from '_src/screens/MusicPlayer';
import PlayerOverlay from '_src/components/PlayerOverlay';
import Splash from '_src/screens/Splash';

export type RootNavigationProps = {};
const Stack = createNativeStackNavigator<RootScreens>();

const RootNavigation: React.FC<RootNavigationProps> = () => {
  const {isLoggedIn, checkSession} = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession().then(() => setLoading(false));
  }, [checkSession]);

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <PlayerOverlay>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: R.colors.BG},
            header: ({navigation}) => <Header navigation={navigation} />,
            headerShown: false,
          }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen component={DashboardNavigation} name="dashboard" />
              <Stack.Screen
                component={ArtistDetails}
                name="artist"
                options={{headerShown: true}}
              />
              <Stack.Screen
                component={AlbumDetails}
                name="album"
                options={{headerShown: true}}
              />
              <Stack.Screen
                component={PlaylistDetails}
                name="playlistDetail"
                options={{headerShown: true}}
              />
              <Stack.Screen
                component={MusicPlayer}
                name="musicPlayer"
                options={{headerShown: true}}
              />
            </>
          ) : (
            <>
              <Stack.Screen component={Login} name="login" />
              <Stack.Screen component={Register} name="register" />
            </>
          )}
        </Stack.Navigator>
      </PlayerOverlay>
    </NavigationContainer>
  );
};

export default RootNavigation;

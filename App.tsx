/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {store} from '_redux';
import RootNavigation from '_navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Theme} from '_src/config/theme';
import {ThemeProvider} from 'react-native-elements';
import TrackPlayer, {Capability} from 'react-native-track-player';

async function setupPlayer() {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
}

const App = () => {
  const isTrackerInitialized = useRef(false);
  useEffect(() => {
    setupPlayer().then(() => (isTrackerInitialized.current = true));
    return () => {
      if (isTrackerInitialized.current) {
        TrackPlayer.destroy();
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={Theme}>
          <RootNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

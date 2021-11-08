/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from '_redux';
import RootNavigation from '_navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Theme} from '_src/config/theme';
import {ThemeProvider} from 'react-native-elements';

const App = () => {
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

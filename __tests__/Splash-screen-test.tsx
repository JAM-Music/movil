import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Splash';

it('Render Splash component without crashing', () => {
  renderer.create(<Element />);
});

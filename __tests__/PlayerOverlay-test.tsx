import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/PlayerOverlay';

it('Render PlayerOverlay component without crashing', () => {
  renderer.create(<Element />);
});

import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Artist';

it('Render Artist component without crashing', () => {
  renderer.create(<Element />);
});

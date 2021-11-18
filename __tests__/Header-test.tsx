import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Header';

it('Render Header component without crashing', () => {
  renderer.create(<Element />);
});

import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Profile';

it('Render Profile component without crashing', () => {
  renderer.create(<Element />);
});

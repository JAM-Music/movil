import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Errortext';

it('Render Errortext component without crashing', () => {
  renderer.create(<Element />);
});

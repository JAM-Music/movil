import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Search';

it('Render Search component without crashing', () => {
  renderer.create(<Element />);
});

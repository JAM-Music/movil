import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Content';

it('Render Content component without crashing', () => {
  renderer.create(<Element />);
});

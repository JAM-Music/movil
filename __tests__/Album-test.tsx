import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/Album';

it('Render Album component without crashing', () => {
  renderer.create(<Element />);
});

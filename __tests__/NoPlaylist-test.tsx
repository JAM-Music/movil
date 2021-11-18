import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/NoPlaylist';

it('Render NoPlaylist component without crashing', () => {
  renderer.create(<Element />);
});

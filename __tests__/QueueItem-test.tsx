import 'react-native';
import React from 'react';
import { render } from "@testing-library/react-native";
import Element from '_screens/QueueItem';

it('Render QueueItem component without crashing', () => {
  renderer.create(<Element />);
});

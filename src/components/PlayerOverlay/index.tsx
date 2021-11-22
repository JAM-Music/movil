import React, {useEffect, useMemo, useState} from 'react';
import {Keyboard, View} from 'react-native';
import Template from './PlayerOverlay.template';
import style from './PlayerOverlay.style';
import {useNavigationState} from '@react-navigation/core';
export type PlayerOverlayProps = {};

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({children}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const state = useNavigationState(s => s);
  const isBottomTabOpen = useMemo(
    () => state?.routes[state?.index].name === 'dashboard',
    [state],
  );

  useEffect(() => {
    const didShowSub = Keyboard.addListener('keyboardDidShow', () => {
      setShowOverlay(false);
    });
    const didHideSub = Keyboard.addListener('keyboardDidHide', () => {
      setShowOverlay(true);
    });
    return () => {
      didShowSub.remove();
      didHideSub.remove();
    };
  }, []);

  return (
    <View style={style.index}>
      {children}
      <Template show={showOverlay} isBottomTabOpen={isBottomTabOpen} />
    </View>
  );
};

export default PlayerOverlay;

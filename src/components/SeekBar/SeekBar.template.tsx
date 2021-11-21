import React from 'react';
import {PanResponderInstance, View} from 'react-native';
import R from '_src/assets/R';
import Time from '../Time';
import style from './SeekBar.style';

export type SeekBarTemplateProps = {
  currentTime: number;
  seekerPosition: number;
  duration: number;
  seekPanResponder: PanResponderInstance;
  setSeekerWidth: (width: number) => any;
};

const Template: React.FC<SeekBarTemplateProps> = ({
  currentTime,
  seekerPosition,
  duration,
  seekPanResponder,
  setSeekerWidth,
}) => {
  return (
    <View style={style.timersContainer}>
      <Time time={currentTime < 0 ? 0 : currentTime} />
      <View
        style={style.container}
        collapsable={false}
        {...seekPanResponder.panHandlers}>
        <View
          style={style.track}
          onLayout={event => setSeekerWidth(event.nativeEvent.layout.width)}
          pointerEvents={'none'}>
          <View
            style={[
              style.fill,
              {
                width: seekerPosition,
                backgroundColor: R.colors.SECONDARY,
              },
            ]}
            pointerEvents={'none'}
          />
        </View>
        <View
          style={[style.handle, {left: seekerPosition}]}
          pointerEvents={'none'}>
          <View
            style={[style.circle, {backgroundColor: R.colors.PRIMARY}]}
            pointerEvents={'none'}
          />
        </View>
      </View>
      <Time time={duration} />
    </View>
  );
};

export default Template;

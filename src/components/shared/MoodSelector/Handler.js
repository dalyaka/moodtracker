import React, { PureComponent } from 'react';
import { PanResponder } from 'react-native';
import PropTypes from 'prop-types';

import { Circle, G } from 'react-native-svg';

import arcCircle from './arcCircle';

export default class Handler extends PureComponent {
  static propTypes = {
    angle: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    cx: PropTypes.number.isRequired,
    cy: PropTypes.number.isRequired,
    colorTo: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onGrant: PropTypes.func.isRequired,
  };

  resp = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => this.props.onGrant(),
    onPanResponderMove: (evt, { moveX, moveY }) => {
      const { cx, cy, onUpdate } = this.props;
      let updated = Math.atan2(moveY - cy, moveX - cx) + Math.PI / 2;
      if (updated < 0) {
        updated += 2 * Math.PI;
      }
      onUpdate(updated);
    },
  });

  render() {
    const { angle, strokeWidth, radius, colorTo, bgColor } = this.props;

    const { toX, toY } = arcCircle(4, 5, radius, angle);
    const tf = { translate: `${toX}, ${toY}` };
    return (
      <G fill={colorTo} transform={tf} {...this.resp.panHandlers}>
        <Circle
          r={(strokeWidth - 1) / 2}
          fill={bgColor}
          stroke={colorTo}
          strokeWidth="1"
        />
      </G>
    );
  }
}

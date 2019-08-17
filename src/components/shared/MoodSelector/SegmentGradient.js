import React from 'react';
import PropTypes from 'prop-types';

import { LinearGradient, Stop } from 'react-native-svg';

import { arcColor, getGradientId } from './colors';
import arcCircle from './arcCircle';

export default function SegmentGradient({
  index,
  radius,
  angle,
  colorFrom,
  colorTo,
}) {
  const { fromX, fromY, toX, toY } = arcCircle(index, 5, radius, angle);
  const { fromColor, toColor } = arcColor(index, 5, colorFrom, colorTo);
  return (
    <LinearGradient
      id={getGradientId(index)}
      x1={fromX.toFixed(2)}
      y1={fromY.toFixed(2)}
      x2={toX.toFixed(2)}
      y2={toY.toFixed(2)}
    >
      <Stop offset="0%" stopColor={fromColor} />
      <Stop offset="1" stopColor={toColor} />
    </LinearGradient>
  );
}

SegmentGradient.propTypes = {
  index: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  colorFrom: PropTypes.string.isRequired,
  colorTo: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Path } from 'react-native-svg';

import { getGradientId } from './colors';
import arcCircle from './arcCircle';

const path = (fx, fy, tx, ty, r) => {
  return `M ${fx.toFixed(2)} ${fy.toFixed(2)} A ${r} ${r} 0 0 1 ${tx.toFixed(
    2
  )} ${ty.toFixed(2)}`;
};

export default function Segment({ index, radius, angle, width }) {
  const { fromX, fromY, toX, toY } = arcCircle(index, 5, radius, angle);
  return (
    <Path
      d={path(fromX, fromY, toX, toY, radius)}
      strokeWidth={width}
      stroke={`url(#${getGradientId(index)})`}
      fill="transparent"
    />
  );
}

Segment.propTypes = {
  index: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  angle: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

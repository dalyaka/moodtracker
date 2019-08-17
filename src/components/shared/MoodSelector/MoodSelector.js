import React, { PureComponent, createRef } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Svg, { Circle, G, Defs } from 'react-native-svg';

import { range } from '../../../common/utils';

import SegmentGradient from './SegmentGradient';

import Segment from './Segment';
import Handler from './Handler';

const getTransform = (s, r) => ({
  translate: `${s / 2 + r + 1}, ${s / 2 + r + 1}`,
});

export default class MoodSelector extends PureComponent {
  static propTypes = {
    angle: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    colorFrom: PropTypes.string,
    colorTo: PropTypes.string,
    bgColor: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    strokeWidth: 40,
    radius: 145,
    colorFrom: '#ff9800',
    colorTo: '#ffcf00',
    bgColor: '#171717',
  };

  state = {
    cx: 0,
    cy: 0,
  };

  circle = createRef();

  onLayout = () => {
    this.circle.current.measure((x, y, w, h, px, py) => {
      const half = this.getContainerWidth() / 2;
      this.setState({ cx: px + half, cy: py + half });
    });
  };

  getContainerWidth() {
    const { strokeWidth, radius } = this.props;
    return strokeWidth + radius * 2 + 2;
  }

  render() {
    const {
      angle,
      strokeWidth,
      radius,
      colorFrom,
      colorTo,
      bgColor,
      onUpdate,
    } = this.props;

    const { cx, cy } = this.state;
    const width = this.getContainerWidth();

    return (
      <View style={{ width, height: width }} onLayout={this.onLayout}>
        <Svg height={width} width={width} ref={this.circle}>
          <Defs>
            {range(5).map(i => (
              <SegmentGradient
                key={i}
                index={i}
                radius={radius}
                angle={angle}
                colorFrom={colorFrom}
                colorTo={colorTo}
              />
            ))}
          </Defs>
          <G transform={getTransform(strokeWidth, radius)}>
            <Circle
              r={radius}
              strokeWidth={strokeWidth}
              fill="transparent"
              stroke={bgColor}
            />
            {range(5).map(i => (
              <Segment
                index={i}
                key={i}
                radius={radius}
                angle={angle}
                width={strokeWidth}
              />
            ))}
            <Handler
              angle={angle}
              cx={cx}
              cy={cy}
              strokeWidth={strokeWidth}
              radius={radius}
              colorTo={colorTo}
              bgColor={bgColor}
              onUpdate={onUpdate}
              onGrant={this.onLayout}
            />
          </G>
        </Svg>
      </View>
    );
  }
}

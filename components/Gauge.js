//  Code based on https://github.com/Reggino/react-svg-gauge

import React from 'react';
import PropTypes from 'prop-types';
import { Svg, Text, Path } from 'react-native-svg';

export default class Gauge extends React.Component {
  render() {
    const labelFontSize = this.props.labelFontSize
      ? this.props.labelFontSize
      : this.props.width / 10;
    const valueFontSize = this.props.valueFontSize
      ? this.props.valueFontSize
      : this.props.width / 5;

    const { Cx, Ro, Ri, Xo, Cy, Xi } = this._getPathValues(this.props.max);
    return (
      <Svg style={{ width: this.props.width, height: this.props.height }}>
        <Path
          fill={this.props.backgroundColor}
          d={this._getPath(this.props.max)}
        />
        <Path fill={this.props.color} d={this._getPath(this.props.value)} />
        <Text
          x={this.props.width / 2}
          y={this.props.height / 4}
          textAnchor="middle"
          fontSize={labelFontSize}
          fontWeight="bold">
          {this.props.label}
        </Text>
        <Text
          x={this.props.width / 2}
          y={this.props.height / 5 * 4}
          textAnchor="middle"
          fontSize={valueFontSize}>
          {this.props.value.toString() + this.props.units}
        </Text>
        <Text
          x={(Cx - Ro + Cx - Ri) / 2}
          y={Cy + 25}
          textAnchor="middle"
          fontSize={this.props.minMaxFontSize}>
          {this.props.min}
        </Text>
        <Text
          x={(Xo + Xi) / 2}
          y={Cy + 25}
          textAnchor="middle"
          fontSize={this.props.minMaxFontSize}>
          {this.props.max}
        </Text>
      </Svg>
    );
  }

  _getPathValues = value => {
    value = Math.min(value, this.props.max);
    value = Math.max(value, this.props.min);

    const a =
      (1 - (value - this.props.min) / (this.props.max - this.props.min)) *
      Math.PI;
    const SinA = Math.sin(a);
    const CosA = Math.cos(a);

    const Cx = this.props.width * 0.5;
    const Cy = this.props.height * 0.8;

    const Ro = Cx - this.props.width * 0.1;
    const Ri = Ro - this.props.width * 0.15;

    const Xo = Cx + Ro * CosA;
    const Yo = Cy - Ro * SinA;
    const Xi = Cx + Ri * CosA;
    const Yi = Cy - Ri * SinA;

    return { Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi };
  };

  _getPath = value => {
    const { Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi } = this._getPathValues(value);

    let path = 'M' + (Cx - Ri) + ',' + Cy + ' ';
    path += 'L' + (Cx - Ro) + ',' + Cy + ' ';
    path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + Xo + ',' + Yo + ' ';
    path += 'L' + Xi + ',' + Yi + ' ';
    path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx - Ri) + ',' + Cy + ' ';

    path += 'M' + (Cx - Ri * 0.9) + ',' + Cy + ' ';
    path +=
      'A' +
      Ri * 0.9 +
      ',' +
      Ri * 0.9 +
      ' 0 0 0 ' +
      (Cx - Ri * 0.9) +
      ',' +
      Cy +
      ' ';

    path += 'Z ';

    return path;
  };
} // End Gauge

Gauge.propTypes = {
  value: PropTypes.number.isRequired,
  units: PropTypes.string,
};

Gauge.defaultProps = {
  label: 'React SVG Gauge',
  min: 0,
  max: 100,
  units: '',
  width: 400,
  height: 320,
  color: 'lime',
  backgroundColor: 'darkgreen',
  minMaxFontSize: 12,
};

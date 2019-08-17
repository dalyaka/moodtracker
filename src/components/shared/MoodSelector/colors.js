import { interpolateHcl } from 'd3-interpolate';

export function getGradientId(index) {
  return `gradient${index}`;
}

export function arcColor(ix, count, from, to) {
  const interpolate = interpolateHcl(from, to);
  return {
    fromColor: interpolate(ix / count),
    toColor: interpolate((ix + 1) / count),
  };
}

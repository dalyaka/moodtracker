export default function arcCircle(ix, segments, radius, angle = 2 * Math.PI) {
  const len = angle % (2 * Math.PI);

  const from = (len / segments) * ix;
  const to = (len / segments) * (ix + 1);

  return {
    fromX: radius * Math.sin(from),
    fromY: -radius * Math.cos(from),
    toX: radius * Math.sin(to + 0.005),
    toY: -radius * Math.cos(to + 0.005),
  };
}

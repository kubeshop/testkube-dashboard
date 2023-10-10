export function formatMilliseconds(duration: number | string): number {
  if (typeof duration === 'number' || /^[0-9]+$/.test(duration)) {
    return Number(duration);
  }
  const [, value, unit] = `${duration}`.match(/^([0-9]+)(ms|s|m|h)?$/)!;
  if (unit === 's') {
    return Number(value) * 1000;
  }
  if (unit === 'm') {
    return Number(value) * 60_000;
  }
  if (unit === 'h') {
    return Number(value) * 3_600_000;
  }
  return Number(value);
}

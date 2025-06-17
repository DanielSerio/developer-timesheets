function reformat(val: string) {
  const int = ~~+val;

  if (isNaN(int)) {
    throw new Error(`'${val}' is not a number`);
  }

  return `${int}`.padStart(2, '0');
}

export function renderTime(value: string) {
  const [hs, ms] = value.split(/[:]/g);

  const hh = reformat(hs);
  const mm = reformat(ms);

  return `${hh}:${mm}`;
}
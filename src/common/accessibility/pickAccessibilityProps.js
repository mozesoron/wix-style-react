import pickBy from 'lodash/pickBy';

export const pickAccessibilityProps = (props = {}) =>
  pickBy(props, (val, key) => key.startsWith('aria-'));

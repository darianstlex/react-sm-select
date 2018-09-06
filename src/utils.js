export const is = (type, target) => target.constructor === type;

export const classes = (...args) => args.reduce((acc, item) => {
  let addOn = '';
  if (is(String, item)) addOn = item;
  if (is(Object, item)) addOn = Object.keys(item).filter(key => !!item[key]).join(' ');
  if (is(Array, item)) addOn = item.join(' ');
  return (acc ? `${acc} ${addOn}` : addOn).trim();
}, '');

export const defaultFilterOptions = (options, filter) =>
  options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

export const areArraysEqual = (first, second) => {
  if (first.length !== second.length) return false;
  return !first.reduce((A, item, idx) => item !== second[idx] ? [...A, item] : A, []).length
};

export const omitDirtyValues = (origin, part, single) => {
  const flatOrigin = origin.map(item => item.value);
  const result = part.reduce((A, item) => flatOrigin.includes(item) ? [...A, item] : A, []);
  if (!single) return result;
  else if (single && result.length) return [result[0]];
  else return [];
};

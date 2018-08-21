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

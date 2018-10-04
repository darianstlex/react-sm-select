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
  const [first, ...rest] = part.reduce((A, item) => flatOrigin.includes(item) ? [...A, item] : A, []);
  return first ? (single ? [first] : [first, ...rest]) : [];
};


export const attachDocumentClickListener = (cb) => {
  document.addEventListener('touchstart', cb, false);
  document.addEventListener('mousedown', cb, false);
};

export const removeDocumentClickListener = (cb) => {
  document.removeEventListener('touchstart', cb, false);
  document.removeEventListener('mousedown', cb, false);
};

export const stopPreventPropagation = event => {
  event.stopPropagation();
  event.preventDefault();
};

export const eventPath = event => {
  const inPath = (event.composedPath && event.composedPath()) || event.path;
  const target = event.target;

  // Safari doesn't include Window, but it should.
  if (inPath != null) return (inPath.indexOf(window) < 0) ? inPath.concat(window) : inPath;

  if (target === window) return [window];

  const getParents = ({parentNode}, memo = []) => parentNode ? getParents(parentNode, memo.concat(parentNode)) : memo;

  return [target].concat(getParents(target), window);
};

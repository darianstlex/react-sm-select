/**
 * Checks if target is of given type
 * @param type
 * @param target
 * @returns {boolean}
 */
export const is = (type, target) => target.constructor === type;

/**
 * Compose classes
 * @param args
 * @returns {*|string}
 */
export const classes = (...args) => args.reduce((acc, item) => {
  let addOn = '';
  if (is(String, item)) addOn = item;
  if (is(Object, item)) addOn = Object.keys(item).filter(key => !!item[key]).join(' ');
  if (is(Array, item)) addOn = item.join(' ');
  return (acc ? `${acc} ${addOn}` : addOn).trim();
}, '');

/**
 * Filter array by containing text in elements
 * @param options
 * @param filter
 * @returns {*}
 */
export const defaultFilterOptions = (options, filter) =>
  options.filter(option =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

/**
 * Checks if two arrays are identical
 * @param first
 * @param second
 * @returns {boolean}
 */
export const areArraysEqual = (first, second) => {
  if (first.length !== second.length) return false;
  return !first.reduce((A, item, idx) => item !== second[idx] ? [...A, item] : A, []).length
};

/**
 * Clear array from props doesn't exist in second array
 * @param origin
 * @param part
 * @param single
 * @returns {*}
 */
export const omitDirtyValues = (origin, part, single) => {
  const flatOrigin = origin.map(item => item.value);
  const [first, ...rest] = part.reduce((A, item) => flatOrigin.includes(item) ? [...A, item] : A, []);
  return first ? (single ? [first] : [first, ...rest]) : [];
};

/**
 * Attaches listener callback to document touch ot mousedown
 * @param cb
 */
export const attachDocumentClickListener = (cb) => {
  document.addEventListener('touchstart', cb, false);
  document.addEventListener('mousedown', cb, false);
};

/**
 * Removes listener from document touch ot mousedown
 * @param cb
 */
export const removeDocumentClickListener = (cb) => {
  document.removeEventListener('touchstart', cb, false);
  document.removeEventListener('mousedown', cb, false);
};

/**
 * Stops event propagation
 * @param event.stopPropagation
 * @param event.preventDefault
 */
export const stopPreventPropagation = event => {
  event.stopPropagation();
  event.preventDefault();
};

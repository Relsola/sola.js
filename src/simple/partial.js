/**
 * @description 裁剪
 * @param {Function} fn
 * @returns {Function}
 */
export function partial(fn, ...rest) {
	return (...arg) => fn(...rest, ...arg);
}

/**
 * @description 柯里化
 * @param {Function} fn 目标函数
 * @param {number} arity 参数数量
 * @returns {Function|any}
 */
function curry(fn, arity = fn.length) {
	const curried = function (...rest) {
		return rest.length >= arity ? fn(...rest) : (...args) => curried(...rest, ...args);
	};
	return curried;
}

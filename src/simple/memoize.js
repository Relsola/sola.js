/**
 * @description 记忆缓存
 * @param {Function} fn
 * @returns {Function}
 */
export function memoize(fn) {
	const cache = new Map();
	const cached = function () {
		const key = JSON.stringify(arguments);
		return cache.has(key)
			? cache.get(key)
			: cache.set(key, fn.apply(this, arguments)) && cache.get(key);
	};
	cached.cache = cache;
	return cached;
}

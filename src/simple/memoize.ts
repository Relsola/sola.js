/**
 * @description 记忆缓存
 */
export default function memoize(fn: Function): Function {
	const cache: Map<string, any> = new Map();
	const cached = function () {
		const key = JSON.stringify(arguments);
		return cache.has(key)
			? cache.get(key)
			: cache.set(key, fn.apply(this, arguments)) && cache.get(key);
	};
	cached.cache = cache;
	return cached;
}

type Fn = (...args: any[]) => any;
type R<T extends Fn> = ReturnType<T>;
type P<T extends Fn> = Parameters<T>;

export const memoize = <T extends Fn>(fn: T) => {
	const cache: Map<string, R<T>> = new Map();
	const cached = function (this: any, ...args: P<T>) {
		const key = Array.prototype.join.call(args);
		return cache.has(key)
			? (cache.get(key) as R<T>)
			: cache.set(key, fn.apply(this, args)) && (cache.get(key) as R<T>);
	};
	cached.cache = cache;
	return cached;
};

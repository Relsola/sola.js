import { Fn } from '../types';

export const memoize = <T extends Fn>(fn: T) => {
	const cache: Map<string, ReturnType<T>> = new Map();

	const cached = function (this: any, ...args: Parameters<T>) {
		const key = Array.prototype.join.call(args);
		!cache.has(key) && cache.set(key, fn.apply(this, args));
		return cache.get(key) as ReturnType<T>;
	};

	cached.cache = cache;
	return cached;
};

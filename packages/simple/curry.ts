export function curry<T extends Function>(
	fn: T,
	arity: number = fn.length
): T | any {
	const curried: (...rest: any[]) => any | T = function (...rest: any[]) {
		return rest.length >= arity
			? fn(...rest)
			: (...args: any[]) => curried(...rest, ...args);
	};
	return curried;
}

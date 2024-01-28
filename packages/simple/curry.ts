/**
 * @description 柯里化
 * @param fn 目标函数
 * @param arity 参数数量
 */
export default function curry(fn: Function, arity: number = fn.length): Function | any {
	const curried: (...rest: any[]) => any | Function = function (...rest: any[]) {
		return rest.length >= arity ? fn(...rest) : (...args: any[]) => curried(...rest, ...args);
	};
	return curried;
}

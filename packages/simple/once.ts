import { Fn } from '../types';

export const once = <T extends Fn>(fn: T) => {
	let ran: boolean = false;
	let result: ReturnType<T>;
	return function (this: any, ...args: Parameters<T>) {
		if (ran) {
			return result;
		}
		result = fn.apply(this, args);
		ran = true;
		return result;
	};
};

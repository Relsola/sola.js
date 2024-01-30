export function once(fn: Function): Function {
	let ran: boolean = false;
	let result: any;
	return function (this: any) {
		if (ran) {
			return result;
		}
		result = fn.apply(this, arguments);
		ran = true;
		return result;
	};
}

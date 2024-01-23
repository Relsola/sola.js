export default function once(fn: Function): any {
	let ran: boolean = false;
	let result: any;
	return function () {
		if (ran) {
			return result;
		}
		result = fn.apply(this, arguments);
		ran = true;
		return result;
	};
}

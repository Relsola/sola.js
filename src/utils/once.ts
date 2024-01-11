export default function once(fn) {
	let ran = false;
	let result;
	return function () {
		if (ran) return result;
		result = fn.apply(this, arguments);
		ran = true;
		return result;
	};
}

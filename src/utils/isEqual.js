export const isEqual = (values, compareFn) => {
	if (!Array.isArray(values) || values.length <= 1) {
		return true;
	}
	if (!compareFn || typeof compareFn !== 'function') {
		compareFn = Object.is;
	}
	const recursivelyCheckEqual = (value, ...rest) =>
		compareFn(value, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest));
	return recursivelyCheckEqual(...values);
};

export function uniqueArrayObject<T>(arr: T[], key: keyof T): T[] {
	if (arr.length <= 1) {
		return arr;
	}
	return arr.filter(function (this: any, item) {
		const value = item[key];
		return this[value] ? false : (this[value] = true);
	}, {});
}

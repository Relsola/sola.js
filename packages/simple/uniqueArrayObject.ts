export const uniqueArrayObject = <T>(arr: T[], key: keyof T): T[] => {
	if (arr.length <= 1) {
		return arr;
	}
	return arr.filter(function (this: Record<any, boolean>, item) {
		const value = item[key] as unknown as string;
		return this[value] ? false : (this[value] = true);
	}, {});
};

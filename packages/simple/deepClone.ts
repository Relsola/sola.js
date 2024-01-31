export const deepClone = <T>(
	source: T,
	map: WeakMap<WeakKey, any> = new WeakMap()
): T => {
	if (!source || typeof source !== 'object') {
		return source;
	}

	for (const Prototype of [RegExp, Date, Error, Set, Map]) {
		if (source instanceof Prototype) {
			return new (Prototype as any)(source);
		}
	}

	if (map.has(source)) {
		return map.get(source)!;
	}

	const clone = (Array.isArray(source) ? [] : {}) as T;

	map.set(source, clone);

	for (const key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			clone[key] = deepClone(source[key], map);
		}
	}
	return clone;
};

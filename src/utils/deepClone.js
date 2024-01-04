export const deepClone = (source, map = new WeakMap()) => {
	if (!source || typeof source !== 'object') {
		return source;
	}

	for (const Prototype of [RegExp, Date, Error, Set, Map]) {
		if (source instanceof Prototype) return new Prototype(source);
	}

	if (map.has(source)) return map.get(source);

	const clone = Array.isArray(source) ? [] : {};

	map.set(source, clone);

	for (const key in source) {
		if (source.hasOwnProperty(key)) clone[key] = deepClone(source[key], map);
	}
	return clone;
};

/**
 * @description 选择对象
 * @param {object} target 目标对象
 * @param {string[]} props 指定的属性
 * @returns {object} 只有指定属性的新对象
 */
export function pick(target: object, props: string[]): object {
	const newObj: object = {};
	props.forEach(
		(prop: string) =>
			Object.hasOwnProperty.call(target, prop) && (newObj[prop] = target[prop])
	);
	return newObj;
}

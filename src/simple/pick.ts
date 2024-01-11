/**
 * @description 选择对象
 * @param {object} target 目标对象
 * @param {[]} props 指定的属性
 * @returns {object} 只有指定属性的新对象
 */
export default function pick(target, props) {
	const newObj = {};
	props.forEach(prop => Object.hasOwn(target, prop) && (newObj[prop] = target[prop]));
	return newObj;
}

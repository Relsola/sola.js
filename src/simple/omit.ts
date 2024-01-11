/**
 * @description 忽略对象
 * @param {object} target 目标对象
 * @param {[]} props 指定的属性
 * @returns {object} 忽略指定属性的新对象
 */
export default function omit(target, props) {
	return Object.keys(target)
		.filter(prop => !props.includes(prop))
		.reduce((acc, prop) => ((acc[prop] = target[prop]), acc), {});
}

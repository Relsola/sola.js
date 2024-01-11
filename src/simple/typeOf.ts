/**
 * @description 校验数据类型
 * @param {any} value
 * @returns {'Number'|'String'|'Undefined'|'Null'|'Object'|'Array'|'Function'}
 */
export default function typeOf(value) {
	return Object.prototype.toString.call(value).slice(8, -1);
}

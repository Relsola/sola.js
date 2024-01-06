/**
 * @description 校验数据类型
 * @param {any} value
 * @returns {'Number'|'String'|'Undefined'|'Null'|'Object'|'Array'|'Function'}
 */
export function typeOf(value) {
	return Object.prototype.toString.call(value).slice(8, -1);
}

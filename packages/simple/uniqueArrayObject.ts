/**
 * @description 根据指定属性过滤数组对象
 * @param {object[]} arr
 * @param {string} key
 * @returns
 */
export default function uniqueArrayObject(arr, key) {
	if (!Array.isArray(arr) || arr.length <= 1) {
		return arr;
	}
	return arr.filter(function (item) {
		const value = item[key];
		return this[value] ? false : (this[value] = true);
	}, {});
}

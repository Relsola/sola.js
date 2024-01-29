/**
 * @description 将多个数组合并为单个二维数组
 * @param {any[][]} arrays
 * @returns {Array}
 */
export default function zip(...arrays: any[][]) {
	const [m, n] = [arrays.length, Math.max(...arrays.map(arr => arr.length))];
	return Array.from({ length: n }, (_, i) =>
		Array.from({ length: m }, (_, k) => arrays[k][i])
	);
}

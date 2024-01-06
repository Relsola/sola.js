/**
 * @description 管道函数
 * @param {Function[]} fns 需要链接的函数数组
 * @returns {Function}
 */
export function pipe(...fns) {
	return (...rest) => fns.reduce((result, fn) => [fn.call(this, ...result)], rest)[0];
}

export function compose(...fns) {
	return (...rest) => fns.reduceRight((result, fn) => [fn.call(this, ...result)], rest)[0];
}

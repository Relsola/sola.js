/**
 * @description 获取 url 查询参数
 * @param {string} [url] 解析的字符串
 * @returns
 */
export function getSearchParams(url) {
	url ||= window.location.search;
	const params = {};
	for (const [key, value] of new URLSearchParams(url).entries()) {
		params[key] = value;
	}
	return params;
}

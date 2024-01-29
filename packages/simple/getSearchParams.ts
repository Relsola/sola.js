/**
 * @description 获取 url 查询参数
 * @param 解析的字符串
 */
export function getSearchParams(url?: string): Record<string, string> {
	url ||= window.location.search;
	const params: Record<string, string> = {};
	for (const [key, value] of new URLSearchParams(url).entries()) {
		params[key] = value;
	}
	return params;
}

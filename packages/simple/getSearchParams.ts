export const getSearchParams = (url?: string): Record<string, string> => {
if(!url){
const href = window.location.href
url = href.substring(href.lastIndexOf('?'))
}
	const params: Record<string, string> = {};
	new URLSearchParams(url).forEach((value: string, key: string) => {
		params[key] = value;
	});
	return params;
};

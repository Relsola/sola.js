export const getSearchParams = (url?: string): Record<string, string> => {
	url ||= window.location.search;
	const params: Record<string, string> = {};
	new URLSearchParams(url).forEach((value: string, key: string) => {
		params[key] = value;
	});
	return params;
};

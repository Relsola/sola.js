export const getSearchParams = (url?: string): Record<string, string> => {
	url ||= window.location.href;
	url = url.substring(url.lastIndexOf('?'));
	const params: Record<string, string> = {};

	new URLSearchParams(url).forEach((value: string, key: string) => {
		params[key] = value;
	});

	return params;
};

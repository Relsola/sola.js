export const copyToClipboard = async (text: string): Promise<boolean> => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (e) {}
		return false;
	}

	const el = document.createElement('textarea');
	el.value = text;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);

	el.select();
	const result = document.execCommand('copy');
	document.body.removeChild(el);

	return result;
};

export const ClickOutside = (element: HTMLElement, callback: () => void) => {
	document.addEventListener('click', e => {
		if (!element.contains(e.target as Node)) {
			callback();
		}
	});
};

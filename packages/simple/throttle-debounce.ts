// https://github.com/niksy/throttle-debounce

interface Fn {
	(...args: any[]): void;
}

interface Options<T extends Fn = Fn> {
	(delay: number, callback: T, immediate?: boolean): (
		this: any,
		...arguments_: Parameters<T>
	) => void;
}

export const throttle: Options = (delay, callback, immediate = true) => {
	let lastExec: number = 0;

	return function (...arguments_) {
		let elapsed: number = Date.now() - lastExec;

		if (elapsed <= delay) {
			return;
		}

		lastExec = Date.now();

		if (immediate) {
			callback.apply(this, arguments_);
			return;
		}

		let timeoutID = setTimeout(() => {
			callback.apply(this, arguments_);
			clearTimeout(timeoutID);
		}, delay);
	};
};

export const debounce: Options = (delay, callback, immediate = true) => {
	let timeoutID: number | undefined;

	return function (...arguments_) {
		if (immediate && !timeoutID) {
			callback.apply(this, arguments_);
		}

		clearTimeout(timeoutID);

		timeoutID = setTimeout(() => {
			clearTimeout(timeoutID);
			if (immediate) {
				timeoutID = undefined;
				return;
			}
			callback.apply(this, arguments_);
		}, delay);
	};
};

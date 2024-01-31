// https://github.com/niksy/throttle-debounce
import { Fn } from 'packages/types';

export const throttle = <T extends Fn>(
	delay: number,
	callback: T,
	immediate: boolean = true
) => {
	let timeoutID: number;
	let lastExec: number = 0;

	return function (this: any, ...arguments_: Parameters<T>): void {
		let elapsed: number = Date.now() - lastExec;

		if (elapsed <= delay) {
			return;
		}

		lastExec = Date.now();

		if (immediate) {
			callback.apply(this, arguments_);
			return;
		}

		timeoutID = setTimeout(() => {
			callback.apply(this, arguments_);
			clearTimeout(timeoutID);
		}, delay);
	};
};

export const debounce = <T extends Fn>(
	delay: number,
	callback: T,
	immediate: boolean = true
) => {
	let timeoutID: number | undefined;

	return function (this: any, ...arguments_: Parameters<T>): void {
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

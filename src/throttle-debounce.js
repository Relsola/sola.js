/**
 * @description n 秒内只执行一次
 * @param {number} delay 延迟时间，毫秒，一般 200 比较有用
 * @param {Function} callback 回调函数，传递 this 和 arguments
 * @param {boolean} [immediate] 立即执行，默认为 true
 * @param {boolean} [debounceMode] 防抖模式，是否在 delay 之前执行回调函数
 * @returns {Function} throttle_function 节流防抖函数
 * @returns {Function} throttle_function.cancel 取消执行节流防抖函数
 */
export function throttle(delay, callback, immediate = true, debounceMode) {
	let timeoutID;
	let cancelled = false;
	let lastExec = 0;

	/** 清除上一个定时器 */
	function clearExistingTimeout() {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}
	}

	/** 取消执行节流防抖函数 */
	function cancel(isRevoke = true) {
		clearExistingTimeout();
		cancelled = isRevoke;
	}

	function wrapper(...arguments_) {
		let self = this;
		let elapsed = Date.now() - lastExec;

		if (cancelled) {
			return;
		}

		/** 执行 callback 并更新 lastExec */
		function exec() {
			lastExec = Date.now();
			callback.apply(self, arguments_);
		}

		/** 如果debounceMode为true，清除 timeoutID 标记进行立即调用 */
		function clear() {
			timeoutID = void 0;
		}

		if (immediate && debounceMode && !timeoutID) {
			exec();
		}

		clearExistingTimeout();

		if (debounceMode === void 0 && elapsed > delay) {
			if (!immediate) {
				lastExec = Date.now();
				timeoutID = setTimeout(exec, delay);
			} else {
				exec();
			}
		} else {
			timeoutID = setTimeout(
				debounceMode ? clear : exec,
				debounceMode === void 0 ? delay - elapsed : delay
			);
		}
	}

	wrapper.cancel = cancel;
	return wrapper;
}

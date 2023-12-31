/**
 * @description 单位时间内只执行一次
 * @param {number} delay 单位延迟时间，毫秒，一般 200 比较有用
 * @param {Function} callback 回调函数，传递 this 和 arguments
 * @param {object} [options] 配置项
 * @param {boolean} [options.noTrailing]
 * @param {boolean} [options.immediate] 立即执行，默认 true
 * @param {boolean} [options.debounceMode] 防抖模式，如果为 true，clear 在 delay 后执行 如果为 false callback 在 delay 执行
 * @returns {Function} 限制执行的节流函数
 */
export function throttle(delay, callback, options) {
	const { noTrailing = false, immediate = true, debounceMode = undefined } = options || {};

	let timeoutID;
	let cancelled = false;
	let lastExec = 0;

	/** 清除定时器 */
	function clearExistingTimeout() {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}
	}

	/** 取消下次执行函数 */
	function cancel(options) {
		const { upcomingOnly = false } = options || {};
		clearExistingTimeout();
		cancelled = !upcomingOnly;
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

		/** 如果debounceMode为true，清除 timeoutID 标记 */
		function clear() {
			timeoutID = undefined;
		}

		if (immediate && debounceMode && !timeoutID) {
			exec();
		}

		clearExistingTimeout();

		if (debounceMode === undefined && elapsed > delay) {
			if (!immediate) {
				lastExec = Date.now();
				if (!noTrailing) {
					timeoutID = setTimeout(debounceMode ? clear : exec, delay);
				}
			} else {
				exec();
			}
		} else if (noTrailing !== true) {
			timeoutID = setTimeout(
				debounceMode ? clear : exec,
				debounceMode === undefined ? delay - elapsed : delay
			);
		}
	}

	wrapper.cancel = cancel;

	// Return the wrapper function.
	return wrapper;
}

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                        to `callback` when the debounced-function is executed.
 * @param {object} [options] -           An object to configure options.
 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 *
 * @returns {Function} A new, debounced function.
 */
export function debounce(delay, callback, options) {
	const { atBegin = false } = options || {};
	return throttle(delay, callback, { debounceMode: atBegin !== false });
}

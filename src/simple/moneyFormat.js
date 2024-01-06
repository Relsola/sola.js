/**
 * @description 金额格式化
 * @param {number} number：要格式化的数字
 * @param {number} decimals：保留几位小数
 * @param {string} dec_point：小数点符号
 * @param {string} thousands_sep：千分位符号
 * @returns
 */
export const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	const n = !isFinite(+number) ? 0 : +number;
	const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals);
	const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep;
	const dec = typeof dec_point === 'undefined' ? '.' : dec_point;
	let s = '';
	const toFixedFix = function (n, prec) {
		const k = Math.pow(10, prec);
		return '' + Math.ceil(n * k) / k;
	};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	const re = /(-?\d+)(\d{3})/;
	while (re.test(s[0])) {
		s[0] = s[0].replace(re, '$1' + sep + '$2');
	}

	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
};

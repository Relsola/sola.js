type T =
	| 'undefined'
	| 'null'
	| 'number'
	| 'string'
	| 'boolean'
	| 'bigint'
	| 'symbol'
	| 'promise'
	| 'function'
	| 'asyncfunction'
	| 'array'
	| 'object'
	| 'regexp'
	| 'set'
	| 'map'
	| 'date';

export const getType = <K = T>(value: any): K =>
	Object.prototype.toString.call(value).slice(8, -1).toLowerCase() as K;

'use strict';

function createNanoEvents() {
    return {
        events: {},
        on(event, cb) {
            (this.events[event] ||= []).push(cb);
            return () => this.off(event, cb);
        },
        emit(event, ...args) {
            const callbacks = this.events[event] || [], length = callbacks.length;
            for (let i = 0; i < length; i++) {
                callbacks[i](...args);
            }
        },
        once(event, cb) {
            const fn = (...args) => {
                cb(...args);
                this.off(event, fn);
            };
            this.on(event, fn);
        },
        off(event, cb) {
            let events = this.events[event];
            if (!Array.isArray(events) || !events.length) {
                return;
            }
            this.events[event] = events.filter(i => cb !== i);
        },
        *[Symbol.iterator]() {
            const { events, on, emit, once, off } = this;
            const values = [on, emit, once, off].map(f => f.bind(this));
            values.push(events, this);
            yield* values;
        }
    };
}

function throttle(delay, callback, immediate = true, debounceMode) {
    let timeoutID;
    let cancelled = false;
    let lastExec = 0;
    function clearExistingTimeout() {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
    }
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
        function exec() {
            lastExec = Date.now();
            callback.apply(self, arguments_);
        }
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
            }
            else {
                exec();
            }
        }
        else {
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === void 0 ? delay - elapsed : delay);
        }
    }
    wrapper.cancel = cancel;
    return wrapper;
}
function debounce(delay, callback, immediate = true) {
    return throttle(delay, callback, true, immediate);
}

function isEqual(values, compareFn) {
    if (!Array.isArray(values) || values.length <= 1) {
        return true;
    }
    if (!compareFn || typeof compareFn !== 'function') {
        compareFn = Object.is;
    }
    const recursivelyCheckEqual = (value, ...rest) => compareFn(value, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest));
    return recursivelyCheckEqual(...values);
}

function deepClone(source, map = new WeakMap()) {
    if (!source || typeof source !== 'object') {
        return source;
    }
    for (const Prototype of [RegExp, Date, Error, Set, Map]) {
        if (source instanceof Prototype) {
            return new Prototype(source);
        }
    }
    if (map.has(source))
        return map.get(source);
    const clone = Array.isArray(source) ? [] : {};
    map.set(source, clone);
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            clone[key] = deepClone(source[key], map);
        }
    }
    return clone;
}

function once(fn) {
    let ran = false;
    let result;
    return function () {
        if (ran) {
            return result;
        }
        result = fn.apply(this, arguments);
        ran = true;
        return result;
    };
}

function createUUID() {
    const tempUrl = URL.createObjectURL(new Blob());
    const uuid = tempUrl.substring(tempUrl.lastIndexOf('/') + 1);
    URL.revokeObjectURL(tempUrl);
    return uuid;
}

function curry(fn, arity = fn.length) {
    const curried = function (...rest) {
        return rest.length >= arity ? fn(...rest) : (...args) => curried(...rest, ...args);
    };
    return curried;
}

function getSearchParams(url) {
    url ||= window.location.search;
    const params = {};
    for (const [key, value] of new URLSearchParams(url).entries()) {
        params[key] = value;
    }
    return params;
}

function memoize(fn) {
    const cache = new Map();
    const cached = function () {
        const key = JSON.stringify(arguments);
        return cache.has(key)
            ? cache.get(key)
            : cache.set(key, fn.apply(this, arguments)) && cache.get(key);
    };
    cached.cache = cache;
    return cached;
}

function moneyFormat(number, decimals, dec_point, thousands_sep) {
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
}

function omit(target, props) {
    return Object.keys(target)
        .filter(prop => !props.includes(prop))
        .reduce((acc, prop) => ((acc[prop] = target[prop]), acc), {});
}

function partial(fn, ...rest) {
    return (...arg) => fn(...rest, ...arg);
}

function pick(target, props) {
    const newObj = {};
    props.forEach(prop => Object.hasOwn(target, prop) && (newObj[prop] = target[prop]));
    return newObj;
}

function pipe(...fns) {
    return (...rest) => fns.reduce((result, fn) => [fn.call(this, ...result)], rest)[0];
}
function compose(...fns) {
    return (...rest) => fns.reduceRight((result, fn) => [fn.call(this, ...result)], rest)[0];
}

function typeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
}

function uniqueArrayObject(arr, key) {
    if (!Array.isArray(arr) || arr.length <= 1) {
        return arr;
    }
    return arr.filter(function (item) {
        const value = item[key];
        return this[value] ? false : (this[value] = true);
    }, {});
}

function zip(...arrays) {
    const [m, n] = [arrays.length, Math.max(...arrays.map(arr => arr.length))];
    return Array.from({ length: n }, (_, i) => Array.from({ length: m }, (_, k) => arrays[k][i]));
}

class MyCache {
    constructor(isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage;
    }
    setItem(key, value) {
        if (typeof value === 'object')
            value = JSON.stringify(value);
        this.storage.setItem(key, value);
    }
    getItem(key) {
        try {
            return JSON.parse(this.storage.getItem(key));
        }
        catch (err) {
            return this.storage.getItem(key);
        }
    }
    removeItem(key) {
        this.storage.removeItem(key);
    }
    clear() {
        this.storage.clear();
    }
    key(index) {
        return this.storage.key(index);
    }
    length() {
        return this.storage.length;
    }
}
const localCache = new MyCache();
const sessionCache = new MyCache(false);

exports.compose = compose;
exports.createNanoEvents = createNanoEvents;
exports.createUUID = createUUID;
exports.curry = curry;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.getSearchParams = getSearchParams;
exports.isEqual = isEqual;
exports.localCache = localCache;
exports.memoize = memoize;
exports.moneyFormat = moneyFormat;
exports.omit = omit;
exports.once = once;
exports.partial = partial;
exports.pick = pick;
exports.pipe = pipe;
exports.sessionCache = sessionCache;
exports.throttle = throttle;
exports.typeOf = typeOf;
exports.uniqueArrayObject = uniqueArrayObject;
exports.zip = zip;

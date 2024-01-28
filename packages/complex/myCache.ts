class MyCache {
	constructor(isLocal = true) {
		this.storage = isLocal ? localStorage : sessionStorage;
	}

	setItem(key, value) {
		if (typeof value === 'object') value = JSON.stringify(value);
		this.storage.setItem(key, value);
	}

	getItem(key) {
		try {
			return JSON.parse(this.storage.getItem(key));
		} catch (err) {
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

export { localCache, sessionCache };

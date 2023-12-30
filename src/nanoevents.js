export const createNanoEvents = () => ({
	events: {},
	on(event, cb) {
		(this.events[event] ||= []).push(cb);
		return () => this.off(event, cb);
	},
	emit(event, ...args) {
		const callbacks = this.events[event] || [],
			length = callbacks.length;
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
});

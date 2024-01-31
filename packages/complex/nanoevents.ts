// https://github.com/ai/nanoevents

interface EventsMap {
	[event: string]: any;
}

interface DefaultEvents extends EventsMap {
	[event: string]: (...args: any) => void;
}

interface Unsubscribe {
	(): void;
}

export interface Emitter<Events extends EventsMap = DefaultEvents> {
	events: {
		get<E extends keyof Events>(key: E): Events[E][] | undefined;
	} & Map<any, any>;

	emit<K extends keyof Events>(
		this: this,
		event: K,
		...args: Parameters<Events[K]>
	): void;

	on<K extends keyof Events>(this: this, event: K, cb: Events[K]): Unsubscribe;
}

type createNanoEvents = <
	Events extends EventsMap = DefaultEvents
>() => Emitter<Events>;

export const createNanoEvents: createNanoEvents = () => ({
	events: new Map(),

	emit(event, ...args) {
		const callbacks = this.events.get(event) || [];
		for (let i = 0, length = callbacks.length; i < length; i++) {
			callbacks[i](...args);
		}
	},

	on(event, cb) {
		const events = this.events;
		events.has(event) ? events.get(event)!.push(cb) : events.set(event, [cb]);
		return () => {
			events.set(
				event,
				events.get(event)!.filter(i => cb !== i)
			);
		};
	}
});

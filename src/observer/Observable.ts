import type { Observer } from "./Observer";

export interface Observable<T> {
	subscribe(observer: Observer<T>): void;
	unsubscribe(observer: Observer<T>): void;
	notify(): void;
}

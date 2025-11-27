import type { Observable } from "../Observable";
import type { Observer } from "../Observer";

import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

class MockObservable<T> implements Observable<T> {
	private observers: Array<Observer<T>> = [];
	private subject: T;

	constructor(subject: T) {
		this.subject = subject;
	}

	subscribe(observer: Observer<T>): void {
		this.observers.push(observer);
	}

	unsubscribe(observer: Observer<T>): void {
		this.observers = this.observers.filter(o => o !== observer);
	}

	notify(): void {
		for (const obs of this.observers) {
			obs.update(this.subject);
		}
	}

	setSubject(subject: T): void {
		this.subject = subject;
	}
}

describe("Observable / Observer", () => {
	it("notifies a single observer with shape updates", () => {
		const oval = new Oval(new Point(1, 2), new Point(5, 6));
		oval.id = "oval-1";

		const updated: unknown[] = [];

		const observer: Observer<Oval> = {
			update(shape) {
				updated.push(shape);
			},
		};

		const observable = new MockObservable(oval);

		observable.subscribe(observer);
		observable.notify();

		expect(updated.length).toBe(1);
		expect(updated[0]).toBe(oval);
	});

	it("notifies multiple observers", () => {
		const sphere = new Sphere(new Point3D(0, 0, 0), 10);
		sphere.id = "sphere-1";

		const callsA: unknown[] = [];
		const callsB: unknown[] = [];

		const obsA: Observer<Sphere> = { update: s => callsA.push(s) };
		const obsB: Observer<Sphere> = { update: s => callsB.push(s) };

		const observable = new MockObservable(sphere);

		observable.subscribe(obsA);
		observable.subscribe(obsB);

		observable.notify();

		expect(callsA.length).toBe(1);
		expect(callsB.length).toBe(1);
		expect(callsA[0]).toBe(sphere);
		expect(callsB[0]).toBe(sphere);
	});

	it("stops notifying after unsubscribe", () => {
		const oval = new Oval(new Point(10, 10), new Point(20, 20));
		oval.id = "oval-xyz";

		const calls: unknown[] = [];

		const observer: Observer<Oval> = {
			update(shape) {
				calls.push(shape);
			},
		};

		const observable = new MockObservable(oval);

		observable.subscribe(observer);
		observable.notify();

		observable.unsubscribe(observer);
		observable.notify();

		expect(calls.length).toBe(1);
		expect(calls[0]).toBe(oval);
	});

	it("notifies with updated subject", () => {
		const oval1 = new Oval(new Point(1, 1), new Point(2, 2));
		const oval2 = new Oval(new Point(4, 4), new Point(9, 9));
		oval1.id = "o1";
		oval2.id = "o2";

		const received: unknown[] = [];

		const obs: Observer<Oval> = {
			update(shape) {
				received.push(shape);
			},
		};

		const observable = new MockObservable(oval1);
		observable.subscribe(obs);

		observable.notify();

		observable.setSubject(oval2);
		observable.notify();

		expect(received.length).toBe(2);
		expect(received[0]).toBe(oval1);
		expect(received[1]).toBe(oval2);
	});
});

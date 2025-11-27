import { randomUUID } from "crypto";
import type { Observer } from "../observer/Observer";
import type { Observable } from "../observer/Observable";

export abstract class Shape implements Observable<Shape> {
	private observers: Array<Observer<Shape>> = [];

	public name: string;
	public id: string;

	constructor(name: string) {
		this.name = name;
		this.id = randomUUID();
	}

	public subscribe(observer: Observer<Shape>): void {
		this.observers.push(observer);
	}

	public unsubscribe(observer: Observer<Shape>): void {
		this.observers.filter(o => o !== observer);
	}

	public notify(): void {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}

	public changed(): void {
		this.notify();
	}
}

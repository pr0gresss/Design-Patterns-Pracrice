import type { Observer } from "../../observer/Observer";
import { Oval } from "../Oval";
import { Point } from "../Point";
import { Point3D } from "../Point3D";
import type { Shape } from "../Shape";
import { Sphere } from "../Sphere";

describe("Shape as Observable", () => {
	it("notifies a single observer on changed()", () => {
		const oval = new Oval(new Point(1, 2), new Point(3, 4));

		const updates: Shape[] = [];
		const observer: Observer<Shape> = {
			update(shape) {
				updates.push(shape);
			},
		};

		oval.subscribe(observer);
		oval.changed();

		expect(updates.length).toBe(1);
		expect(updates[0]).toBe(oval);
	});

	it("notifies multiple observers", () => {
		const sphere = new Sphere(new Point3D(0, 0, 0), 5);

		const a: Shape[] = [];
		const b: Shape[] = [];

		const obsA: Observer<Shape> = { update: s => a.push(s) };
		const obsB: Observer<Shape> = { update: s => b.push(s) };

		sphere.subscribe(obsA);
		sphere.subscribe(obsB);

		sphere.changed();

		expect(a.length).toBe(1);
		expect(b.length).toBe(1);
		expect(a[0]).toBe(sphere);
		expect(b[0]).toBe(sphere);
	});

	it("unsubscribe stops notifications (currently FAILS because of bug)", () => {
		const oval = new Oval(new Point(10, 10), new Point(20, 20));

		const updates: Shape[] = [];

		const observer: Observer<Shape> = {
			update(shape) {
				updates.push(shape);
			},
		};

		oval.subscribe(observer);
		oval.changed();

		oval.unsubscribe(observer);
		oval.changed();

		expect(updates.length).toBe(1);
	});

	it("still works across different shape types", () => {
		const oval = new Oval(new Point(1, 1), new Point(5, 5));
		const sphere = new Sphere(new Point3D(1, 1, 1), 2);

		const seen: Shape[] = [];

		const obs: Observer<Shape> = { update: s => seen.push(s) };

		oval.subscribe(obs);
		sphere.subscribe(obs);

		oval.changed();
		sphere.changed();

		expect(seen).toContain(oval);
		expect(seen).toContain(sphere);
		expect(seen.length).toBe(2);
	});
});

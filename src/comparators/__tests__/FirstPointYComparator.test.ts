import { FirstPointYComparator } from "../../comparators/FirstPointYComparator";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

describe("FirstPointYComparator", () => {
	const comp = new FirstPointYComparator();

	it("compares two Ovals by upperLeftCorner.y", () => {
		const a = new Oval(new Point(0, 1), new Point(10, 20));
		const b = new Oval(new Point(0, 5), new Point(8, 15));

		expect(comp.compare(a, b)).toBeLessThan(0);
		expect(comp.compare(b, a)).toBeGreaterThan(0);
		expect(comp.compare(a, a)).toBe(0);
	});

	it("compares two Spheres by centerPoint.y", () => {
		const a = new Sphere(new Point3D(0, 7, 0), 5);
		const b = new Sphere(new Point3D(0, 3, 0), 5);

		expect(comp.compare(a, b)).toBeGreaterThan(0);
		expect(comp.compare(b, a)).toBeLessThan(0);
		expect(comp.compare(a, a)).toBe(0);
	});

	it("returns 0 for mismatched shapes", () => {
		const oval = new Oval(new Point(0, 10), new Point(5, 15));
		const sphere = new Sphere(new Point3D(0, 10, 0), 5);

		expect(comp.compare(oval, sphere)).toBe(0);
		expect(comp.compare(sphere, oval)).toBe(0);
	});
});

import { FirstPointXComparator } from "../../comparators/FirstPointXComparator";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

describe("FirstPointXComparator", () => {
	const comp = new FirstPointXComparator();

	it("compares two Ovals by upperLeftCorner.x", () => {
		const a = new Oval(new Point(1, 5), new Point(10, 20));
		const b = new Oval(new Point(3, 2), new Point(8, 15));

		expect(comp.compare(a, b)).toBeLessThan(0);
		expect(comp.compare(b, a)).toBeGreaterThan(0);
		expect(comp.compare(a, a)).toBe(0);
	});

	it("compares two Spheres by centerPoint.x", () => {
		const a = new Sphere(new Point3D(10, 0, 0), 5);
		const b = new Sphere(new Point3D(2, 0, 0), 5);

		expect(comp.compare(a, b)).toBeGreaterThan(0);
		expect(comp.compare(b, a)).toBeLessThan(0);
		expect(comp.compare(a, a)).toBe(0);
	});

	it("returns 0 for mismatched shapes", () => {
		const oval = new Oval(new Point(5, 5), new Point(7, 7));
		const sphere = new Sphere(new Point3D(5, 5, 0), 3);

		expect(comp.compare(oval, sphere)).toBe(0);
		expect(comp.compare(sphere, oval)).toBe(0);
	});
});

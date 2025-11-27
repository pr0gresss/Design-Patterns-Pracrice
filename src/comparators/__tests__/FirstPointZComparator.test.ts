import { FirstPointZComparator } from "../../comparators/FirstPointZComparator";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

describe("FirstPointZComparator", () => {
	const comp = new FirstPointZComparator();

	it("returns 0 when comparing Ovals (Oval has no Z)", () => {
		const a = new Oval(new Point(0, 0), new Point(5, 5));
		const b = new Oval(new Point(0, 0), new Point(5, 5));

		expect(comp.compare(a, b)).toBe(0);
	});

	it("compares two Spheres by centerPoint.z", () => {
		const a = new Sphere(new Point3D(0, 0, 5), 3);
		const b = new Sphere(new Point3D(0, 0, 1), 3);

		expect(comp.compare(a, b)).toBeGreaterThan(0);
		expect(comp.compare(b, a)).toBeLessThan(0);
		expect(comp.compare(a, a)).toBe(0);
	});

	it("returns 0 for mismatched shapes", () => {
		const oval = new Oval(new Point(0, 0), new Point(5, 5));
		const sphere = new Sphere(new Point3D(0, 0, 3), 3);

		expect(comp.compare(oval, sphere)).toBe(0);
		expect(comp.compare(sphere, oval)).toBe(0);
	});
});

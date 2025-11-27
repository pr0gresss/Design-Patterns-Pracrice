import { SphereFirstPointZComparator } from "../SphereFirstPointZComparator";
import { Sphere } from "../../entities/Sphere";
import { Point3D } from "../../entities/Point3D";

describe("SphereFirstPointZComparator", () => {
	it("compares by centerPoint.z", () => {
		const cmp = new SphereFirstPointZComparator();

		const s1 = new Sphere(new Point3D(5, 5, 1), 10);
		const s2 = new Sphere(new Point3D(5, 5, 9), 10);

		expect(cmp.compare(s1, s2)).toBeLessThan(0);
		expect(cmp.compare(s2, s1)).toBeGreaterThan(0);
		expect(cmp.compare(s1, s1)).toBe(0);
	});
});

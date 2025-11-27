import { SphereFirstPointYComparator } from "../SphereFirstPointYComparator";
import { Sphere } from "../../entities/Sphere";
import { Point3D } from "../../entities/Point3D";

describe("SphereFirstPointYComparator", () => {
	it("compares by centerPoint.y", () => {
		const cmp = new SphereFirstPointYComparator();

		const s1 = new Sphere(new Point3D(5, 1, 3), 10);
		const s2 = new Sphere(new Point3D(5, 4, 3), 10);

		expect(cmp.compare(s1, s2)).toBeLessThan(0);
		expect(cmp.compare(s2, s1)).toBeGreaterThan(0);
		expect(cmp.compare(s1, s1)).toBe(0);
	});
});

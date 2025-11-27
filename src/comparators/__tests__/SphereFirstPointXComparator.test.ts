import { SphereFirstPointXComparator } from "../SphereFirstPointXComparator";
import { Sphere } from "../../entities/Sphere";
import { Point3D } from "../../entities/Point3D";

describe("SphereFirstPointXComparator", () => {
	it("compares by centerPoint.x", () => {
		const cmp = new SphereFirstPointXComparator();

		const s1 = new Sphere(new Point3D(1, 2, 3), 10);
		const s2 = new Sphere(new Point3D(4, 2, 3), 10);

		expect(cmp.compare(s1, s2)).toBeLessThan(0);
		expect(cmp.compare(s2, s1)).toBeGreaterThan(0);
		expect(cmp.compare(s1, s1)).toBe(0);
	});
});

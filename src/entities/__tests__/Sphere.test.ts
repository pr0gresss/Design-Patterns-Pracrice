import { Sphere } from "../Sphere";
import { Point3D } from "../Point3D";

describe("Sphere", () => {
	it("creates a sphere with correct center and radius", () => {
		const center = new Point3D(1, 2, 3);
		const sphere = new Sphere(center, 10);

		expect(sphere.centerPoint).toBe(center);
		expect(sphere.radius).toBe(10);
	});

	it("inherits from Shape", () => {
		const s = new Sphere(new Point3D(0, 0, 0), 5);
		expect(s).toBeInstanceOf(Sphere);
		expect(s.name).toBe("Sphere");
	});
});

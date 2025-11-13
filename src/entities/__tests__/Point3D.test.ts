import { Point3D } from "../Point3D";

describe("Point3D", () => {
	it("creates a 3D point with correct coordinates", () => {
		const p = new Point3D(1, 2, 3);
		expect(p.x).toBe(1);
		expect(p.y).toBe(2);
		expect(p.z).toBe(3);
	});

	it("inherits x and y from Point", () => {
		const p = new Point3D(-5, 10, 15);
		expect(p).toBeInstanceOf(Point3D);
		expect(Object.hasOwn(p, "x")).toBe(true);
		expect(Object.hasOwn(p, "y")).toBe(true);
	});
});

import { Point } from "../Point";

describe("Point", () => {
	it("creates a point with correct coordinates", () => {
		const p = new Point(3, 4);
		expect(p.x).toBe(3);
		expect(p.y).toBe(4);
	});

	it("stores numeric coordinates as given", () => {
		const p = new Point(-1.5, 99.9);
		expect(p.x).toBeCloseTo(-1.5);
		expect(p.y).toBeCloseTo(99.9);
	});
});

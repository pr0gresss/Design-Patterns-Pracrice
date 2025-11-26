import { SphereService } from "../../services/SphereService";
import { Sphere } from "../../entities/Sphere";
import { Point3D } from "../../entities/Point3D";

function makeSphere(x: number, y: number, z: number, r: number): Sphere {
	const centerPoint = new Point3D(x, y, z);
	return new Sphere(centerPoint, r);
}

describe("SphereService", () => {
	describe("isSphere", () => {
		it("returns true for positive finite radius", () => {
			const sphere = makeSphere(0, 0, 0, 5);
			expect(SphereService.isSphere(sphere)).toBe(true);
		});

		it("returns false for zero radius", () => {
			const sphere = makeSphere(0, 0, 0, 0);
			expect(SphereService.isSphere(sphere)).toBe(false);
		});

		it("returns false for infinite radius", () => {
			const sphere = makeSphere(0, 0, 0, Infinity);
			expect(SphereService.isSphere(sphere)).toBe(false);
		});
	});

	describe("getSurfaceArea", () => {
		it("computes correct surface area", () => {
			const sphere = makeSphere(0, 0, 0, 3);
			const expected = 4 * Math.PI * 3 ** 2;
			expect(SphereService.getSurfaceArea(sphere)).toBeCloseTo(expected);
		});
	});

	describe("getVolume", () => {
		it("computes correct volume", () => {
			const sphere = makeSphere(0, 0, 0, 3);
			const expected = (4 / 3) * Math.PI * 3 ** 3;
			expect(SphereService.getVolume(sphere)).toBeCloseTo(expected);
		});
	});

	describe("touchesCoordinateAxis", () => {
		it("returns true when sphere touches an axis", () => {
			const sphere = makeSphere(5, 0, 0, 5);
			expect(SphereService.touchesCoordinateAxis(sphere)).toBe(true);
		});

		it("returns false when sphere does not touch any axis", () => {
			const sphere = makeSphere(2, 2, 2, 1);
			expect(SphereService.touchesCoordinateAxis(sphere)).toBe(false);
		});
	});

	describe("volumeRatioByAxis", () => {
		it("returns Infinity when sphere does not intersect given axis", () => {
			const sphere = makeSphere(10, 0, 0, 5);
			expect(SphereService.volumeRatioByAxis(sphere, "x")).toBe(Infinity);
		});

		it("returns 1 when center lies on the axis", () => {
			const sphere = makeSphere(0, 0, 0, 5);
			expect(SphereService.volumeRatioByAxis(sphere, "x")).toBeCloseTo(1);
		});

		it("returns smaller ratio for off-center sphere", () => {
			const sphere = makeSphere(3, 0, 0, 5);
			const ratio = SphereService.volumeRatioByAxis(sphere, "x");
			expect(ratio).toBeGreaterThan(0);
			expect(ratio).toBeLessThan(1);
		});
	});
});

import { SphereService } from "../../services/SphereService";
import { Sphere } from "../../entities/Sphere";
import { Point3D } from "../../entities/Point3D";

function makeSphere(x: number, y: number, z: number, r: number): Sphere {
	return new Sphere(new Point3D(x, y, z), r);
}

describe("SphereService", () => {
	let service: SphereService;

	beforeEach(() => {
		service = new SphereService();
	});

	describe("isSphere", () => {
		it("returns true for positive finite radius", () => {
			expect(service.isSphere(makeSphere(0, 0, 0, 5))).toBe(true);
		});

		it("returns false for zero radius", () => {
			expect(service.isSphere(makeSphere(0, 0, 0, 0))).toBe(false);
		});

		it("returns false for infinite radius", () => {
			expect(service.isSphere(makeSphere(0, 0, 0, Infinity))).toBe(false);
		});
	});

	describe("getSurfaceArea", () => {
		it("computes correct surface area", () => {
			const sphere = makeSphere(0, 0, 0, 3);
			const expected = 4 * Math.PI * 3 ** 2;
			expect(service.getArea(sphere)).toBeCloseTo(expected);
		});
	});

	describe("getVolume", () => {
		it("computes correct volume", () => {
			const sphere = makeSphere(0, 0, 0, 3);
			const expected = (4 / 3) * Math.PI * 3 ** 3;
			expect(service.getVolume(sphere)).toBeCloseTo(expected);
		});
	});

	describe("touchesCoordinateAxis", () => {
		it("returns true when sphere touches an axis", () => {
			expect(service.touchesCoordinateAxis(makeSphere(5, 0, 0, 5))).toBe(true);
		});

		it("returns false when sphere does not touch any axis", () => {
			expect(service.touchesCoordinateAxis(makeSphere(2, 2, 2, 1))).toBe(false);
		});
	});

	describe("volumeRatioByAxis", () => {
		it("returns Infinity when sphere does not intersect the axis", () => {
			expect(service.volumeRatioByAxis(makeSphere(10, 0, 0, 5), "x")).toBe(Infinity);
		});

		it("returns 1 when center lies on axis", () => {
			expect(service.volumeRatioByAxis(makeSphere(0, 0, 0, 5), "x")).toBeCloseTo(1);
		});

		it("returns smaller ratio for off-center sphere", () => {
			const ratio = service.volumeRatioByAxis(makeSphere(3, 0, 0, 5), "x");
			expect(ratio).toBeGreaterThan(0);
			expect(ratio).toBeLessThan(1);
		});
	});
});

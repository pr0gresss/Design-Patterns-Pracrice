import { OvalService } from "../../services/OvalService";
import { Oval } from "../../entities/Oval";
import { Point } from "../../entities/Point";

function makeOval(x1: number, y1: number, x2: number, y2: number): Oval {
	const upperLeft = new Point(x1, y1);
	const bottomRight = new Point(x2, y2);
	return new Oval(upperLeft, bottomRight);
}

describe("OvalService", () => {
	describe("isOval", () => {
		it("returns true when both semi-axes are positive", () => {
			const oval = makeOval(0, 0, 10, 6);
			expect(OvalService.isOval(oval)).toBe(true);
		});

		it("returns false when one semi-axis is zero", () => {
			const oval = makeOval(0, 0, 0, 5);
			expect(OvalService.isOval(oval)).toBe(false);
		});
	});

	describe("isCircle", () => {
		it("returns true when semi-axes are equal and positive", () => {
			const oval = makeOval(0, 0, 10, 10);
			expect(OvalService.isCircle(oval)).toBe(true);
		});

		it("returns false when semi-axes differ", () => {
			const oval = makeOval(0, 0, 10, 8);
			expect(OvalService.isCircle(oval)).toBe(false);
		});
	});

	describe("getPerimeter", () => {
		it("returns a positive number close to theoretical circumference", () => {
			const oval = makeOval(0, 0, 10, 6);
			const perimeter = OvalService.getPerimeter(oval);
			expect(perimeter).toBeGreaterThan(0);
			expect(perimeter).toBeCloseTo(25, -1);
		});
	});

	describe("getArea", () => {
		it("calculates the correct area", () => {
			const oval = makeOval(0, 0, 10, 6);
			const area = OvalService.getArea(oval);
			const expected = Math.PI * 5 * 3;
			expect(area).toBeCloseTo(expected);
		});
	});

	describe("intersectsOneAxis", () => {
		it("returns true when only one axis intersects the distance line", () => {
			const oval = makeOval(0, 0, 10, 4);

			expect(OvalService.intersectsOneAxis(oval, 5)).toBe(true);
		});

		it("returns false when both axes intersect", () => {
			const oval = makeOval(0, 0, 10, 10);
			expect(OvalService.intersectsOneAxis(oval, 5)).toBe(false);
		});
	});

});

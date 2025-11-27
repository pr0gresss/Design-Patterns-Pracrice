import { FirstQuadrantSpecification } from "../FirstQuadrantSpecification";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";
import { Shape } from "../../entities/Shape";

describe("FirstQuadrantSpecification", () => {
	const spec = new FirstQuadrantSpecification();

	describe("Oval", () => {
		it("returns true when the oval is fully in the first quadrant", () => {
			const oval = new Oval(new Point(1, 1), new Point(5, 5));

			expect(spec.isSatisfiedBy(oval)).toBe(true);
		});

		it("returns false when one of the oval's points is negative", () => {
			const oval = new Oval(new Point(-1, 2), new Point(3, 4));

			expect(spec.isSatisfiedBy(oval)).toBe(false);
		});

		it("returns false when both points are negative", () => {
			const oval = new Oval(new Point(-3, -3), new Point(-1, -1));

			expect(spec.isSatisfiedBy(oval)).toBe(false);
		});
	});

	describe("Sphere", () => {
		it("returns true when the sphere is fully in the first octant", () => {
			const sphere = new Sphere(new Point3D(5, 5, 5), 2);

			expect(spec.isSatisfiedBy(sphere)).toBe(true);
		});

		it("returns false when center is in first octant but radius pushes it out", () => {
			const sphere = new Sphere(new Point3D(1, 1, 1), 2);

			expect(spec.isSatisfiedBy(sphere)).toBe(false);
		});

		it("returns false when center is negative", () => {
			const sphere = new Sphere(new Point3D(-1, 3, 4), 1);

			expect(spec.isSatisfiedBy(sphere)).toBe(false);
		});

		it("returns false when center axes are fine but one axis minus radius is negative", () => {
			const sphere = new Sphere(new Point3D(2, 2, 1), 2);

			expect(spec.isSatisfiedBy(sphere)).toBe(false);
		});

		it("returns false when passed unknown shape", () => {
			class Weird extends Shape {
				constructor() {
					super("Weird");
				}
			}

			expect(spec.isSatisfiedBy(new Weird())).toBe(false);
		});
	});
});

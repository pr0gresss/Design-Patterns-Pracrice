import { DistanceSpecification } from "../DistanceSpecification";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";
import { Shape } from "../../entities/Shape";

describe("DistanceSpecification", () => {
	it("accepts Oval within distance range", () => {
		const oval = new Oval(new Point(10, 4), new Point(14, 8));
		oval.id = "o1";

		const spec = new DistanceSpecification(10, 20);
		expect(spec.isSatisfiedBy(oval)).toBe(true);
	});

	it("rejects Oval outside distance range", () => {
		const oval = new Oval(new Point(1, 1), new Point(3, 3));
		oval.id = "o2";

		const spec = new DistanceSpecification(5, 10);
		expect(spec.isSatisfiedBy(oval)).toBe(false);
	});

	it("accepts Sphere within distance range", () => {
		const sphere = new Sphere(new Point3D(3, 4, 12), 5);
		sphere.id = "s1";

		const spec = new DistanceSpecification(12, 14);
		expect(spec.isSatisfiedBy(sphere)).toBe(true);
	});

	it("rejects Sphere outside distance range", () => {
		const sphere = new Sphere(new Point3D(1, 1, 1), 2);
		sphere.id = "s2";

		const spec = new DistanceSpecification(5, 10);
		expect(spec.isSatisfiedBy(sphere)).toBe(false);
	});

	it("returns false for unknown Shape subclasses", () => {
		class WeirdShape extends Shape {
			constructor() {
				super("weird");
			}
		}

		const weird = new WeirdShape();
		const spec = new DistanceSpecification(0, 100);

		expect(spec.isSatisfiedBy(weird as unknown as Shape)).toBe(false);
	});
});

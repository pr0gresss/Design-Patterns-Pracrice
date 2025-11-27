import { PerimeterSpecification } from "../PerimeterSpecification";
import { ShapeServiceRegistry } from "../../services/ShapeServiceRegistry";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

describe("PerimeterSpecification", () => {
	const makeOval = (id: string, x1: number, y1: number, x2: number, y2: number) => {
		const o = new Oval(new Point(x1, y1), new Point(x2, y2));
		o.id = id;
		return o;
	};

	const makeSphere = (id: string, x: number, y: number, z: number, r: number) => {
		const s = new Sphere(new Point3D(x, y, z), r);
		s.id = id;
		return s;
	};

	it("returns true when shape perimeter is within range (Oval)", () => {
		const oval = makeOval("o1", 0, 0, 10, 6);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		const peri = service.getPerimeter(oval);
		const spec = new PerimeterSpecification(peri - 1, peri + 1);

		expect(spec.isSatisfiedBy(oval)).toBe(true);
	});

	it("returns false when perimeter is less than min", () => {
		const oval = makeOval("o2", 0, 0, 10, 6);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		const peri = service.getPerimeter(oval);
		const spec = new PerimeterSpecification(peri + 1, peri + 10);

		expect(spec.isSatisfiedBy(oval)).toBe(false);
	});

	it("returns false when perimeter is greater than max", () => {
		const oval = makeOval("o3", 0, 0, 10, 6);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		const peri = service.getPerimeter(oval);
		const spec = new PerimeterSpecification(peri - 10, peri - 1);

		expect(spec.isSatisfiedBy(oval)).toBe(false);
	});

	it("works with Sphere (perimeter is always 0)", () => {
		const sphere = makeSphere("s1", 0, 0, 0, 5);

		const specMatch = new PerimeterSpecification(0, 0);
		const specFail = new PerimeterSpecification(1, 10);

		expect(specMatch.isSatisfiedBy(sphere)).toBe(true);
		expect(specFail.isSatisfiedBy(sphere)).toBe(false);
	});
});

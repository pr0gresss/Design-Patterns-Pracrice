import { AreaSpecification } from "../AreaSpecification";
import { ShapeServiceRegistry } from "../../services/ShapeServiceRegistry";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

describe("AreaSpecification", () => {
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

	it("returns true when area is within range (Oval)", () => {
		const oval = makeOval("oA", 0, 0, 10, 6);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		const area = service.getArea(oval);
		const spec = new AreaSpecification(area - 1, area + 1);

		expect(spec.isSatisfiedBy(oval)).toBe(true);
	});

	it("returns false when area is less than min", () => {
		const oval = makeOval("oB", 0, 0, 10, 6);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		const area = service.getArea(oval);
		const spec = new AreaSpecification(area + 1, area + 10);

		expect(spec.isSatisfiedBy(oval)).toBe(false);
	});

	it("returns false when area is greater than max", () => {
		const oval = makeOval("oC", 0, 0, 10, 6);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		const area = service.getArea(oval);
		const spec = new AreaSpecification(area - 10, area - 1);

		expect(spec.isSatisfiedBy(oval)).toBe(false);
	});

	it("works with Sphere", () => {
		const sphere = makeSphere("sA", 0, 0, 0, 3);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Sphere);

		const area = service.getArea(sphere);

		const specMatch = new AreaSpecification(area, area);
		const specFail = new AreaSpecification(area + 1, area + 10);

		expect(specMatch.isSatisfiedBy(sphere)).toBe(true);
		expect(specFail.isSatisfiedBy(sphere)).toBe(false);
	});
});

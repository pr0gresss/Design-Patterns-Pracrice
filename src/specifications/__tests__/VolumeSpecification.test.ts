import { VolumeSpecification } from "../VolumeSpecification";
import { ShapeServiceRegistry } from "../../services/ShapeServiceRegistry";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";

describe("VolumeSpecification", () => {
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

	it("returns true when volume is within range (Sphere)", () => {
		const sphere = makeSphere("s1", 0, 0, 0, 3);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Sphere);

		const vol = service.getVolume(sphere);
		const spec = new VolumeSpecification(vol - 1, vol + 1);

		expect(spec.isSatisfiedBy(sphere)).toBe(true);
	});

	it("returns false when volume is less than min", () => {
		const sphere = makeSphere("s2", 0, 0, 0, 3);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Sphere);

		const vol = service.getVolume(sphere);
		const spec = new VolumeSpecification(vol + 1, vol + 10);

		expect(spec.isSatisfiedBy(sphere)).toBe(false);
	});

	it("returns false when volume is greater than max", () => {
		const sphere = makeSphere("s3", 0, 0, 0, 3);
		const service = ShapeServiceRegistry.getInstance().getShapeService(Sphere);

		const vol = service.getVolume(sphere);
		const spec = new VolumeSpecification(vol - 10, vol - 1);

		expect(spec.isSatisfiedBy(sphere)).toBe(false);
	});

	it("works with Oval (volume always 0)", () => {
		const oval = makeOval("o1", 0, 0, 10, 6);

		const specMatch = new VolumeSpecification(0, 0);
		const specFail = new VolumeSpecification(1, 10);

		expect(specMatch.isSatisfiedBy(oval)).toBe(true);
		expect(specFail.isSatisfiedBy(oval)).toBe(false);
	});
});

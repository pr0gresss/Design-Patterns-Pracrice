import { Warehouse } from "../../warehouse/Warehouse";
import { ShapeServiceRegistry } from "../../services/ShapeServiceRegistry";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { Point } from "../../entities/Point";
import { Point3D } from "../../entities/Point3D";
import { ShapeServiceRegistryError } from "../../errors/ShapeServiceRegistryError";
import { Shape } from "../../entities/Shape";

function makeOval(id: string, x1: number, y1: number, x2: number, y2: number): Oval {
	const upperLeft = new Point(x1, y1);
	const bottomRight = new Point(x2, y2);
	const oval = new Oval(upperLeft, bottomRight);
	oval.id = id;
	return oval;
}

function makeSphere(id: string, x: number, y: number, z: number, r: number): Sphere {
	const sphere = new Sphere(new Point3D(x, y, z), r);
	sphere.id = id;
	return sphere;
}

describe("Warehouse full method tests (Oval + Sphere)", () => {
	beforeEach(() => {
		(Warehouse as any).instance = undefined;
	});

	it("stores and retrieves Oval area, perimeter, and volume", () => {
		const warehouse = Warehouse.getInstance();

		const oval = makeOval("oval1", 0, 0, 10, 6);
		warehouse.update(oval);

		const service = ShapeServiceRegistry.getInstance().getShapeService(Oval);

		expect(warehouse.getArea("oval1")).toBeCloseTo(service.getArea(oval));
		expect(warehouse.getPerimeter("oval1")).toBeCloseTo(service.getPerimeter(oval));
		expect(warehouse.getVolume("oval1")).toBe(service.getVolume(oval));
	});

	it("stores and retrieves Sphere area, perimeter, and volume", () => {
		const warehouse = Warehouse.getInstance();

		const sphere = makeSphere("sphere1", 1, 2, 3, 4);
		warehouse.update(sphere);

		const service = ShapeServiceRegistry.getInstance().getShapeService(Sphere);

		expect(warehouse.getArea("sphere1")).toBeCloseTo(service.getArea(sphere));
		expect(warehouse.getPerimeter("sphere1")).toBe(service.getPerimeter(sphere));
		expect(warehouse.getVolume("sphere1")).toBeCloseTo(service.getVolume(sphere));
	});

	it("handles multiple shapes independently", () => {
		const warehouse = Warehouse.getInstance();

		const oval = makeOval("o2", 2, 2, 12, 8);
		const sphere = makeSphere("s2", 0, 0, 0, 5);

		warehouse.update(oval);
		warehouse.update(sphere);

		const ovalService = ShapeServiceRegistry.getInstance().getShapeService(Oval);
		const sphereService = ShapeServiceRegistry.getInstance().getShapeService(Sphere);

		expect(warehouse.getArea("o2")).toBeCloseTo(ovalService.getArea(oval));
		expect(warehouse.getArea("s2")).toBeCloseTo(sphereService.getArea(sphere));

		expect(warehouse.getPerimeter("o2")).toBeCloseTo(ovalService.getPerimeter(oval));
		expect(warehouse.getPerimeter("s2")).toBe(sphereService.getPerimeter(sphere));

		expect(warehouse.getVolume("o2")).toBe(ovalService.getVolume(oval));
		expect(warehouse.getVolume("s2")).toBeCloseTo(sphereService.getVolume(sphere));
	});

	it("throws error if service is missing", () => {
		const warehouse = Warehouse.getInstance();

		class WeirdShape extends Shape {
			constructor() {
				super("weird");
			}
		}

		const weird = new WeirdShape();

		expect(() => warehouse.update(weird)).toThrow(ShapeServiceRegistryError);
	});
});

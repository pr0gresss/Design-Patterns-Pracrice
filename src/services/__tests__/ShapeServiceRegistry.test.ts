import { ShapeServiceRegistry } from "../../services/ShapeServiceRegistry";
import { Oval } from "../../entities/Oval";
import { Sphere } from "../../entities/Sphere";
import { OvalService } from "../../services/OvalService";
import { SphereService } from "../../services/SphereService";
import { Shape } from "../../entities/Shape";

describe("ShapeServiceRegistry", () => {
	it("returns a singleton instance", () => {
		const a = ShapeServiceRegistry.getInstance();
		const b = ShapeServiceRegistry.getInstance();
		expect(a).toBe(b);
	});

	it("retrieves OvalService for Oval", () => {
		const registry = ShapeServiceRegistry.getInstance();
		const service = registry.getShapeService(Oval);
		expect(service).toBeInstanceOf(OvalService);
	});

	it("retrieves SphereService for Sphere", () => {
		const registry = ShapeServiceRegistry.getInstance();
		const service = registry.getShapeService<Sphere, SphereService>(Sphere);
		expect(service).toBeInstanceOf(SphereService);
	});

	it("throws when unknown shape constructor is passed", () => {
		class FakeShape extends Shape {}
		const registry = ShapeServiceRegistry.getInstance();
		expect(() => registry.getShapeService(FakeShape)).toThrow();
	});
});

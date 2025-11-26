import { SphereFactory } from "../../factories/SphereFactory";
import { SphereValidator } from "../../validators/SphereValidator";
import { SphereValidationError } from "../../errors/SphereValidationError";
import { Point3D } from "../../entities/Point3D";
import { Sphere } from "../../entities/Sphere";

jest.mock("../../validators/SphereValidator");

describe("SphereFactory", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("creates a Sphere when the radius is valid", () => {
		(SphereValidator.validate as jest.Mock).mockReturnValue(true);

		const sphere = SphereFactory.create(1, 2, 3, 10);

		expect(sphere).toBeInstanceOf(Sphere);
		expect(sphere.centerPoint).toBeInstanceOf(Point3D);
		expect(sphere.centerPoint.x).toBe(1);
		expect(sphere.centerPoint.y).toBe(2);
		expect(sphere.centerPoint.z).toBe(3);
		expect(sphere.radius).toBe(10);
	});

	it("throws a SphereValidationError when the radius is invalid", () => {
		(SphereValidator.validate as jest.Mock).mockReturnValue(false);

		expect(() => SphereFactory.create(0, 0, 0, -5)).toThrow(
			SphereValidationError,
		);
	});

	it("calls the validator with the correct radius", () => {
		const spy = jest.spyOn(SphereValidator, "validate").mockReturnValue(true);

		SphereFactory.create(1, 1, 1, 42);

		expect(spy).toHaveBeenCalledWith(42);
	});
});

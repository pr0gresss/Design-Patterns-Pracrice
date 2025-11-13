import { OvalFactory } from "../../factories/OvalFactory";
import { OvalValidator } from "../../validators/OvalValidator";
import { OvalValidationError } from "../../errors/OvalValidationError";
import { Oval } from "../../entities/Oval";
import { Point } from "../../entities/Point";

jest.mock("../../validators/OvalValidator");

describe("OvalFactory", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("creates an Oval when parameters are valid", () => {
		(OvalValidator.validate as jest.Mock).mockReturnValue(true);

		const oval = OvalFactory.create(0, 0, 10, 5);

		expect(oval).toBeInstanceOf(Oval);
		expect(oval.upperLeftCorner).toBeInstanceOf(Point);
		expect(oval.bottomRightCorner).toBeInstanceOf(Point);

		expect(oval.upperLeftCorner.x).toBe(0);
		expect(oval.upperLeftCorner.y).toBe(0);
		expect(oval.bottomRightCorner.x).toBe(10);
		expect(oval.bottomRightCorner.y).toBe(5);
	});

	it("throws an OvalValidationError when parameters are invalid", () => {
		(OvalValidator.validate as jest.Mock).mockReturnValue(false);

		expect(() =>
			OvalFactory.create(0, 0, 0, 10),
		).toThrow(OvalValidationError);
	});

	it("passes the correct arguments to the validator", () => {
		const spy = jest.spyOn(OvalValidator, "validate").mockReturnValue(true);

		OvalFactory.create(1, 2, 3, 4);

		expect(spy).toHaveBeenCalledWith(1, 2, 3, 4);
	});
});

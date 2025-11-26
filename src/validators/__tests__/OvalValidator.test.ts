import { OvalValidator } from "../OvalValidator";

describe("OvalValidator", () => {
	describe("validate", () => {
		it("returns true when upper-left and bottom-right points differ in both coordinates", () => {
			expect(OvalValidator.validate(0, 0, 10, 5)).toBe(true);
		});

		it("returns false when x coordinates are equal", () => {
			expect(OvalValidator.validate(5, 0, 5, 10)).toBe(false);
		});

		it("returns false when y coordinates are equal", () => {
			expect(OvalValidator.validate(0, 7, 10, 7)).toBe(false);
		});

		it("returns false when both x and y coordinates are equal", () => {
			expect(OvalValidator.validate(3, 3, 3, 3)).toBe(false);
		});

		it("handles negative coordinates correctly", () => {
			expect(OvalValidator.validate(-5, -5, 5, 5)).toBe(true);
		});
	});
});

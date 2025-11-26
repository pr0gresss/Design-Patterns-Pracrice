import { SphereValidator } from "../SphereValidator";

describe("SphereValidator", () => {
	describe("validate", () => {
		it("returns true for a positive radius", () => {
			expect(SphereValidator.validate(5)).toBe(true);
		});

		it("returns false for a zero radius", () => {
			expect(SphereValidator.validate(0)).toBe(false);
		});

		it("returns false for a negative radius", () => {
			expect(SphereValidator.validate(-10)).toBe(false);
		});
	});
});

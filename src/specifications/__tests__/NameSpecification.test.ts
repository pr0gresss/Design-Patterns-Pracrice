import { NameSpecification } from "../NameSpecification";

describe("NameSpecification", () => {
	it("returns true when the object's name matches the target name", () => {
		const spec = new NameSpecification("Circle");
		const obj = { name: "Circle" };

		expect(spec.isSatisfiedBy(obj)).toBe(true);
	});

	it("returns false when the object's name does not match", () => {
		const spec = new NameSpecification("Circle");
		const obj = { name: "Square" };

		expect(spec.isSatisfiedBy(obj)).toBe(false);
	});

	it("returns false when the object has an empty name", () => {
		const spec = new NameSpecification("");
		const obj = { name: "NotEmpty" };

		expect(spec.isSatisfiedBy(obj)).toBe(false);
	});

	it("matches empty name correctly", () => {
		const spec = new NameSpecification("");
		const obj = { name: "" };

		expect(spec.isSatisfiedBy(obj)).toBe(true);
	});
});

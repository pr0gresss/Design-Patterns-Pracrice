import { IdSpecification } from "../IdSpecification";

describe("IdSpecification", () => {
	it("returns true when the object's id matches the target id", () => {
		const spec = new IdSpecification("abc123");
		const obj = { id: "abc123" };

		expect(spec.isSatisfiedBy(obj)).toBe(true);
	});

	it("returns false when the object's id does not match", () => {
		const spec = new IdSpecification("abc123");
		const obj = { id: "xyz999" };

		expect(spec.isSatisfiedBy(obj)).toBe(false);
	});

	it("returns false when the object has an empty id", () => {
		const spec = new IdSpecification("");
		const obj = { id: "not-empty" };

		expect(spec.isSatisfiedBy(obj)).toBe(false);
	});

	it("matches empty id correctly", () => {
		const spec = new IdSpecification("");
		const obj = { id: "" };

		expect(spec.isSatisfiedBy(obj)).toBe(true);
	});
});

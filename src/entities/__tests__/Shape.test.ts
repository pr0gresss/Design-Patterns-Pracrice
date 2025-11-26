import { Shape } from "../Shape";

describe("Shape (abstract)", () => {
	class TestShape extends Shape {
		constructor() {
			super("TestShape");
		}
	}

	it("assigns the name property correctly", () => {
		const s = new TestShape();
		expect(s.name).toBe("TestShape");
	});

	it("allows subclassing and instantiation through subclasses", () => {
		const shape = new TestShape();
		expect(shape).toBeInstanceOf(Shape);
		expect(shape).toBeInstanceOf(TestShape);
	});

	it("permits changing the name property since it's not readonly", () => {
		const s = new TestShape();
		s.name = "RenamedShape";
		expect(s.name).toBe("RenamedShape");
	});
});

import { Oval } from "../Oval";
import { Point } from "../Point";

describe("Oval", () => {
	it("creates an Oval with correct upperLeftCorner and bottomRightCorner", () => {
		const upperLeft = new Point(0, 0);
		const bottomRight = new Point(10, 5);

		const oval = new Oval(upperLeft, bottomRight);

		expect(oval.upperLeftCorner).toBe(upperLeft);
		expect(oval.bottomRightCorner).toBe(bottomRight);
		expect(oval.name).toBe("Oval");
	});
});

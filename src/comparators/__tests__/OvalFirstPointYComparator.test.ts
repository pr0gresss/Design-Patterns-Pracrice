import { OvalFirstPointYComparator } from "../OvalFirstPointYComparator";
import { Oval } from "../../entities/Oval";
import { Point } from "../../entities/Point";

describe("OvalFirstPointYComparator", () => {
	it("compares by upperLeftCorner.y", () => {
		const cmp = new OvalFirstPointYComparator();

		const o1 = new Oval(new Point(5, 1), new Point(10, 4));
		const o2 = new Oval(new Point(5, 4), new Point(10, 7));

		expect(cmp.compare(o1, o2)).toBeLessThan(0);
		expect(cmp.compare(o2, o1)).toBeGreaterThan(0);
		expect(cmp.compare(o1, o1)).toBe(0);
	});
});

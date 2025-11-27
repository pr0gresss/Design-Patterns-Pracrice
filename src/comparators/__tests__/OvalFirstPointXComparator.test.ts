import { OvalFirstPointXComparator } from "../OvalFirstPointXComparator";
import { Oval } from "../../entities/Oval";
import { Point } from "../../entities/Point";

describe("OvalFirstPointXComparator", () => {
	it("compares by upperLeftCorner.x", () => {
		const cmp = new OvalFirstPointXComparator();

		const o1 = new Oval(new Point(1, 10), new Point(5, 3));
		const o2 = new Oval(new Point(4, 10), new Point(7, 3));

		expect(cmp.compare(o1, o2)).toBeLessThan(0);
		expect(cmp.compare(o2, o1)).toBeGreaterThan(0);
		expect(cmp.compare(o1, o1)).toBe(0);
	});
});

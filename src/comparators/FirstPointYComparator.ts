import type { Comparator } from "./Comparator";
import { Oval } from "../entities/Oval";
import type { Shape } from "../entities/Shape";
import { Sphere } from "../entities/Sphere";

export class FirstPointYComparator implements Comparator<Shape> {
	compare(a: Shape, b: Shape): number {
		if (a instanceof Oval && b instanceof Oval) {
			return a.upperLeftCorner.y - b.upperLeftCorner.y;
		}

		if (a instanceof Sphere && b instanceof Sphere) {
			return a.centerPoint.y - b.centerPoint.y;
		}

		return 0;
	}
}

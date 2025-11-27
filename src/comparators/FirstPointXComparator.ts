import type { Comparator } from "./Comparator";
import { Oval } from "../entities/Oval";
import type { Shape } from "../entities/Shape";
import { Sphere } from "../entities/Sphere";

export class FirstPointXComparator implements Comparator<Shape> {
	compare(a: Shape, b: Shape): number {
		if (a instanceof Oval && b instanceof Oval) {
			return a.upperLeftCorner.x - b.upperLeftCorner.x;
		}

		if (a instanceof Sphere && b instanceof Sphere) {
			return a.centerPoint.x - b.centerPoint.x;
		}

		return 0;
	}
}

import type { Comparator } from "./Comparator";
import { Oval } from "../entities/Oval";
import type { Shape } from "../entities/Shape";
import { Sphere } from "../entities/Sphere";

export class FirstPointZComparator implements Comparator<Shape> {
	compare(a: Shape, b: Shape): number {
		if (a instanceof Oval && b instanceof Oval) {
			return 0;
		}

		if (a instanceof Sphere && b instanceof Sphere) {
			return a.centerPoint.z - b.centerPoint.z;
		}

		return 0;
	}
}

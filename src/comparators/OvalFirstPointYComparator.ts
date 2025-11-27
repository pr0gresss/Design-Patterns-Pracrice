import type { Comparator } from "./Comparator";
import type { Oval } from "../entities/Oval";

export class OvalFirstPointYComparator implements Comparator<Oval> {
	compare(a: Oval, b: Oval): number {
		return a.upperLeftCorner.y - b.upperLeftCorner.y;
	}
}

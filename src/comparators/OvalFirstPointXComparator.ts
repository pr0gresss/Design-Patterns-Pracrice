import type { Comparator } from "./Comparator";
import type { Oval } from "../entities/Oval";

export class OvalFirstPointXComparator implements Comparator<Oval> {
	compare(a: Oval, b: Oval): number {
		return a.upperLeftCorner.x - b.upperLeftCorner.x;
	}
}

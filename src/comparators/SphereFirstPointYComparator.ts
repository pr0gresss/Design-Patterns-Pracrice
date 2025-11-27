import type { Comparator } from "./Comparator";
import type { Sphere } from "../entities/Sphere";

export class SphereFirstPointYComparator implements Comparator<Sphere> {
	compare(a: Sphere, b: Sphere): number {
		return a.centerPoint.y - b.centerPoint.y;
	}
}

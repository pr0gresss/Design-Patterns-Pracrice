import type { Comparator } from "./Comparator";
import type { Sphere } from "../entities/Sphere";

export class SphereFirstPointXComparator implements Comparator<Sphere> {
	compare(a: Sphere, b: Sphere): number {
		return a.centerPoint.x - b.centerPoint.x;
	}
}

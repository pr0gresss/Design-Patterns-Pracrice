import type { Comparator } from "./Comparator";
import type { Sphere } from "../entities/Sphere";

export class SphereFirstPointZComparator implements Comparator<Sphere> {
	compare(a: Sphere, b: Sphere): number {
		return a.centerPoint.z - b.centerPoint.z;
	}
}

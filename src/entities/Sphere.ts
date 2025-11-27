import type { Point3D } from "./Point3D";
import { Shape } from "./Shape";

export class Sphere extends Shape {
	constructor(
		public centerPoint: Point3D,
		public radius: number,
	) {
		super("Sphere");
	}
}

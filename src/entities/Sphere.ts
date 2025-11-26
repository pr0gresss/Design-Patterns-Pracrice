import type { Point3D } from "./Point3D";
import { Shape } from "./Shape";

export class Sphere extends Shape {
	constructor(
		public readonly centerPoint: Point3D,
		public readonly radius: number,
	) {
		super("Sphere");
	}
}

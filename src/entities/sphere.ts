import {Point3D} from "./point3D";
import {Shape} from "./shape";

export class Sphere extends Shape {
	constructor(
		public readonly point3D: Point3D,
		public readonly radius: number
	) {
		super("Sphere");
	}
}

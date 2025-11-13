import { Point } from "./Point";

export class Point3D extends Point {
	constructor(
		public readonly x: number,
		public readonly y: number,
		public readonly z: number,
	) {
		super(x, y);
	}
}

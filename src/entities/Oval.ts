import type { Point } from "./Point";
import { Shape } from "./Shape";

export class Oval extends Shape {
	constructor(
		public readonly upperLeftCorner: Point,
		public readonly bottomRightCorner: Point,
	) {
		super("Oval");
	}
}

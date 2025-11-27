import type { Point } from "./Point";
import { Shape } from "./Shape";

export class Oval extends Shape {
	public constructor(
		public upperLeftCorner: Point,
		public bottomRightCorner: Point,
	) {
		super("Oval");
	}
}

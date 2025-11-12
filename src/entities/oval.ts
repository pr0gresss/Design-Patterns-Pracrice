import {Point} from "./point";
import {Shape} from "./shape";

export class Oval extends Shape {
	constructor(
		public readonly upperLeftCorner: Point,
		public readonly bottomRightCorner: Point
	) {
		super("Oval");
	}
}

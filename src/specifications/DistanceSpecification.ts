import type { Shape } from "../entities/Shape";
import { Oval } from "../entities/Oval";
import { Sphere } from "../entities/Sphere";
import type { Specification } from "./Specification";

export class DistanceSpecification implements Specification<Shape> {
	constructor(
		private readonly minDistance: number,
		private readonly maxDistance: number,
	) {}

	isSatisfiedBy(shape: Shape): boolean {
		let distance: number;

		if (shape instanceof Oval) {
			const centerX = (shape.upperLeftCorner.x + shape.bottomRightCorner.x) / 2;
			const centerY = (shape.upperLeftCorner.y + shape.bottomRightCorner.y) / 2;
			distance = Math.sqrt(centerX ** 2 + centerY ** 2);
		} else if (shape instanceof Sphere) {
			distance = Math.sqrt(shape.centerPoint.x ** 2 +shape.centerPoint.y ** 2 + shape.centerPoint.z ** 2);
		} else {
			return false;
		}

		return distance >= this.minDistance && distance <= this.maxDistance;
	}
}

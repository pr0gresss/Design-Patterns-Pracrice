import type { Specification } from "./Specification";
import type { Shape } from "../entities/Shape";
import type { Point3D } from "../entities/Point3D";
import type { Point } from "../entities/Point";
import { Oval } from "../entities/Oval";
import { Sphere } from "../entities/Sphere";

export class FirstQuadrantSpecification implements Specification<Shape> {
	isSatisfiedBy(shape: Shape): boolean {
		if (shape instanceof Oval) {
			return this.isOvalInFirstQuadrant(shape);
		}
		if (shape instanceof Sphere) {
			return this.isSphereInFirstQuadrant(shape);
		}
		return false;
	}

	private isOvalInFirstQuadrant(oval: Oval): boolean {
		return (
			this.isPointInFirstQuadrant(oval.upperLeftCorner) &&
			this.isPointInFirstQuadrant(oval.bottomRightCorner)
		);
	}

	private isSphereInFirstQuadrant(sphere: Sphere): boolean {
		const c = sphere.centerPoint;
		const r = sphere.radius;

		return (
			this.isPoint3DInFirstOctant(c) &&
			c.x - r >= 0 &&
			c.y - r >= 0 &&
			c.z - r >= 0
		);
	}

	private isPointInFirstQuadrant(point: Point): boolean {
		return point.x >= 0 && point.y >= 0;
	}

	private isPoint3DInFirstOctant(point: Point3D): boolean {
		return point.x >= 0 && point.y >= 0 && point.z >= 0;
	}
}

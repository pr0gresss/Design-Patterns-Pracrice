import {Oval} from "../entities/oval";
import {Point} from "../entities/point";

export class OvalSerice {
	public static isOval(oval: Oval): boolean {
		const {semiAxisX, semiAxisY} = this.getAxes(oval);

		return semiAxisX > 0 && semiAxisY > 0;
	}

	public static isCircle(oval: Oval): boolean {
		const {semiAxisX, semiAxisY} = this.getAxes(oval);

		return semiAxisX > 0 && semiAxisY > 0 && semiAxisX === semiAxisY;
	}

	public static getPerimeter(oval: Oval): number {
		const {semiAxisX, semiAxisY} = this.getAxes(oval);

		const h =
			Math.pow(semiAxisX - semiAxisY, 2) / Math.pow(semiAxisX + semiAxisY, 2);

		return (
			Math.PI *
			(semiAxisX + semiAxisY) *
			(1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)))
		);
	}

	public static intersectsOneAxis(oval: Oval, distance: number): boolean {
		const {semiAxisX, semiAxisY} = this.getAxes(oval);

		const center = new Point(
			(oval.upperLeftCorner.x + oval.bottomRightCorner.x) / 2,
			(oval.upperLeftCorner.y + oval.bottomRightCorner.y) / 2
		);

		const intersectsX =
			center.y - semiAxisY <= distance && center.y + semiAxisY >= distance;
		const intersectsY =
			center.x - semiAxisX <= distance && center.x + semiAxisX >= distance;

		return (intersectsX && !intersectsY) || (!intersectsX && intersectsY);
	}

	private static getAxes(oval: Oval): {semiAxisX: number; semiAxisY: number} {
		const semiAxisX =
			Math.abs(oval.upperLeftCorner.x - oval.bottomRightCorner.x) / 2;
		const semiAxisY =
			Math.abs(oval.upperLeftCorner.y - oval.bottomRightCorner.y) / 2;

		return {semiAxisX, semiAxisY};
	}
}

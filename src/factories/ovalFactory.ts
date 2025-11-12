import {Oval} from "../entities/oval";
import {Point} from "../entities/point";
import {OvalValidator} from "../validators/ovalValidator";

export class OvalFactory {
	public static create(
		upperLeftPointX: number,
		upperLeftPointY: number,
		bottomRightPointX: number,
		bottomRightPointY: number
	): Oval {
		if (
			!OvalValidator.validate(
				upperLeftPointX,
				upperLeftPointY,
				bottomRightPointX,
				bottomRightPointY
			)
		) {
			// Custom Exception...
			throw new Error();
		}

		const upperLeftPoint = new Point(upperLeftPointX, upperLeftPointY);
		const bottomRightPoint = new Point(bottomRightPointX, bottomRightPointY);

		return new Oval(upperLeftPoint, bottomRightPoint);
	}
}

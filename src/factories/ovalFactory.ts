import { Oval } from "../entities/Oval";
import { Point } from "../entities/Point";
import { OvalValidationError } from "../errors/OvalValidationError";
import { OvalValidator } from "../validators/OvalValidator";

export class OvalFactory {
	public static create(
		upperLeftPointX: number,
		upperLeftPointY: number,
		bottomRightPointX: number,
		bottomRightPointY: number,
	): Oval {
		if (
			!OvalValidator.validate(
				upperLeftPointX,
				upperLeftPointY,
				bottomRightPointX,
				bottomRightPointY,
			)
		) {
			// Custom Exception...
			throw new OvalValidationError(
				`Invalid oval parameters: (${upperLeftPointX}, ${upperLeftPointY}), (${bottomRightPointX}, ${bottomRightPointY})`,
			);
		}

		const upperLeftPoint = new Point(upperLeftPointX, upperLeftPointY);
		const bottomRightPoint = new Point(bottomRightPointX, bottomRightPointY);

		return new Oval(upperLeftPoint, bottomRightPoint);
	}
}

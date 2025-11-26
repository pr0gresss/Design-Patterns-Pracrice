import { Point3D } from "../entities/Point3D";
import { Sphere } from "../entities/Sphere";
import { SphereValidationError } from "../errors/SphereValidationError";
import { SphereValidator } from "../validators/SphereValidator";

export class SphereFactory {
	public static create(
		centerPointX: number,
		centerPointY: number,
		centerPointZ: number,
		radius: number,
	): Sphere {
		if (!SphereValidator.validate(radius)) {
			throw new SphereValidationError(
				`Invalid sphere parameters: radius = ${radius}`,
			);
		}

		const centerPoint = new Point3D(centerPointX, centerPointY, centerPointZ);

		return new Sphere(centerPoint, radius);
	}
}

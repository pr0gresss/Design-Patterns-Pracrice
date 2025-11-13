import type { Sphere } from "../entities/Sphere";

export class SphereService {
	public static isSphere(sphere: Sphere): boolean {
		return sphere.radius > 0 && Number.isFinite(sphere.radius);
	}
	public static getSurfaceArea(sphere: Sphere): number {
		return 4 * Math.PI * sphere.radius ** 2;
	}

	public static getVolume(sphere: Sphere): number {
		return (4 / 3) * Math.PI * sphere.radius ** 3;
	}

	public static touchesCoordinateAxis(sphere: Sphere): boolean {
		const { x, y, z } = sphere.centerPoint;
		return (
			Math.abs(x) === sphere.radius ||
			Math.abs(y) === sphere.radius ||
			Math.abs(z) === sphere.radius
		);
	}

	public static volumeRatioByAxis(
		sphere: Sphere,
		axis: "x" | "y" | "z",
	): number {
		const d = Math.abs(sphere.centerPoint[axis]);

		if (d >= sphere.radius) {
			return Infinity;
		}

		if (d === 0) {
			return 1;
		}

		const h = sphere.radius - d;
		const capVolume = (Math.PI * h ** 2 * (3 * sphere.radius - h)) / 3;
		const restVolume = this.getVolume(sphere) - capVolume;

		return capVolume / restVolume;
	}
}

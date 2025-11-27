import type { Shape } from "../entities/Shape";
import type { IShapeService } from "../services/IShapeService";
import { type ShapeConstructor, ShapeServiceRegistry } from "../services/ShapeServiceRegistry";
import type { Specification } from "./Specification";

export class VolumeSpecification<T extends Shape> implements Specification<T> {
	private shapeService: IShapeService<T> | null;

	constructor(private minVolume: number, private maxVolume: number) {
		this.shapeService = null;
	}

	public isSatisfiedBy(shape: T): boolean {
		this.shapeService = ShapeServiceRegistry.getInstance().getShapeService<T, IShapeService<T>>(shape.constructor as ShapeConstructor);

		const area = this.shapeService.getVolume(shape);
		return area >= this.minVolume && area <= this.maxVolume;
	}
}

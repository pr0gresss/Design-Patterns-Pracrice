import type { Shape } from "../entities/Shape";
import type { Observer } from "../observer/Observer";
import {
	type ShapeConstructor,
	ShapeServiceRegistry,
} from "../services/ShapeServiceRegistry";

export class Warehouse implements Observer<Shape> {
	private static instance: Warehouse;
	private areaMap: Map<string, number> = new Map();
	private volumeMap: Map<string, number> = new Map();
	private perimeterMap: Map<string, number> = new Map();

	private constructor() {}

	public static getInstance(): Warehouse {
		if (!Warehouse.instance) {
			Warehouse.instance = new Warehouse();
		}
		return Warehouse.instance;
	}

	public update(shape: Shape): void {
		const shapeService = ShapeServiceRegistry.getInstance().getShapeService(shape.constructor as ShapeConstructor);

		if (!shapeService) {
			return;
		}

		this.areaMap.set(shape.id, shapeService.getArea(shape));
		this.perimeterMap.set(shape.id, shapeService.getPerimeter(shape));
		this.volumeMap.set(shape.id, shapeService.getVolume(shape));
	}

	public getArea(id: string): number | undefined {
		return this.areaMap.get(id);
	}

	public getVolume(id: string): number | undefined {
		return this.volumeMap.get(id);
	}

	public getPerimeter(id: string): number | undefined {
		return this.perimeterMap.get(id);
	}
}

import type { Shape } from "../entities/Shape";
import type { IShapeService } from "./IShapeService";
import { Oval } from "../entities/Oval";
import { OvalService } from "./OvalService";
import { Sphere } from "../entities/Sphere";
import { SphereService } from "./SphereService";
import { ShapeServiceRegistryError } from "../errors/ShapeServiceRegistryError";

export type ShapeConstructor = new (...args: never[]) => Shape;

export class ShapeServiceRegistry {
	private static instance: ShapeServiceRegistry;

	private ServiceRegistry: Map<ShapeConstructor, IShapeService<Shape>> =
		new Map<ShapeConstructor, IShapeService<Shape>>();

	private constructor() {
		this.ServiceRegistry.set(Oval, new OvalService());
		this.ServiceRegistry.set(Sphere, new SphereService());
	}

	public static getInstance(): ShapeServiceRegistry {
		if (!ShapeServiceRegistry.instance) {
			ShapeServiceRegistry.instance = new ShapeServiceRegistry();
		}

		return ShapeServiceRegistry.instance;
	}

	public getShapeService<TShape extends Shape, TService extends IShapeService<TShape>>(shapeConstructor: ShapeConstructor): TService {
		const shapeService = this.ServiceRegistry.get(shapeConstructor) as TService;

		if (!shapeService) {
			throw new ShapeServiceRegistryError("Can't access shape service.");
		}

		return shapeService;
	}
}

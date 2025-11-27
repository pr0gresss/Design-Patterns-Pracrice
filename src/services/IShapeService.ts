import type { Shape } from "../entities/Shape";

export interface IShapeService<T extends Shape> {
	getArea(shape : T): number;
	getPerimeter(shape : T): number;
	getVolume(shape: T): number;
}

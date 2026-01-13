import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";

export interface ShapeVisitor {
	visitCircle(circle: Circle): void;
	visitRectangle(rectangle: Rectangle): void;
}

import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";

export interface Renderer {
	drawCircle(circle: Circle): void
	drawRectangle(rectangle: Rectangle): void
}

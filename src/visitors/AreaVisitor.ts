import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";
import type { ShapeVisitor } from "./ShapeVisitor";

export class AreaVisitor implements ShapeVisitor {
	visitCircle(circle: Circle): void {
		const area = Math.PI * circle.radius ^ 2;
		console.log("Circle area: ", area);
	}

	visitRectangle(rectangle: Rectangle): void {
		const area = rectangle.height * rectangle.width;
		console.log("Rectangle area: ", area);
	}
}

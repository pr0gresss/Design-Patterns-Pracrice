import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";
import type { ShapeVisitor } from "./ShapeVisitor";

export class PerimeterVisitor implements ShapeVisitor {
	visitCircle(circle: Circle): void {
		const perimiter = 2 * circle.radius * Math.PI;
		console.log("Cicrle perimiter: ", perimiter);
	}

	visitRectangle(rectangle: Rectangle): void {
		const perimiter = (rectangle.height + rectangle.width) * 2;
		console.log("Rectangle perimiter: ", perimiter);
	}
}

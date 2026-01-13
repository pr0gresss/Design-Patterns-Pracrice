import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";
import type { Renderer } from "./Renderer";

export class PrinterRenderer implements Renderer {
	drawCircle(circle: Circle): void {
		// Drawing logic missing due to poor tech task
		console.log("Drawing circle on printer...");
	}
	drawRectangle(rectangle: Rectangle): void {
		// Drawing logic missing due to poor tech task
		console.log("Drawing rectangle on Printer...");
	}
}

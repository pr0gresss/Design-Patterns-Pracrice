import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";
import type { Renderer } from "./Renderer";

export class ScreenRenderer implements Renderer {
	drawCircle(circle: Circle): void {
		// Drawing logic missing due to poor tech task
		console.log("Drawing circle on Screen...");
	}
	drawRectangle(rectangle: Rectangle): void {
		// Drawing logic missing due to poor tech task
		console.log("Drawing rectangle on Screen...");
	}
}

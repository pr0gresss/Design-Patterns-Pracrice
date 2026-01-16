import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";
import type { Renderer } from "./Renderer";

export class ScreenRenderer implements Renderer {
	drawCircle(circle: Circle): void {
		console.log("Drawing circle on Screen...");
	}

	drawRectangle(rectangle: Rectangle): void {
		console.log("Drawing rectangle on Screen...");
	}
}

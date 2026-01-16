import type { Circle } from "../entities/Circle";
import type { Rectangle } from "../entities/Rectangle";
import type { Renderer } from "./Renderer";

export class ScreenRenderer implements Renderer {
	drawCircle(circle: Circle): void {
		console.log(
			`(Screen) Shape: Circle, Properties: x:${circle.x}, y:${circle.y}, radius:${circle.radius}`,
		);
	}

	drawRectangle(rectangle: Rectangle): void {
		console.log(
			`(Screen) Shape: Rectangle, Properties: x:${rectangle.x}, y:${rectangle.y}, width:${rectangle.width}, height:${rectangle.height}`,
		);
	}
}

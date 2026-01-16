import type { Renderer } from "../renderers/Renderer";
import type { ShapeVisitor } from "../visitors/ShapeVisitor";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
	public x: number;
	public y: number;
	public width: number;
	public height: number;

	constructor(
		renderer: Renderer,
		x: number,
		y: number,
		width: number,
		height: number,
	) {
		super(renderer);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	draw(): void {
		this.renderer.drawShape(
			"Rectangle",
			`x:${this.x}, y:${this.y}, width:${this.width}, height:${this.height}`,
		);
	}

	accept(visitor: ShapeVisitor): void {
		visitor.visitRectangle(this);
	}
}

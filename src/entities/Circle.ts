import type { Renderer } from "../renderers/Renderer";
import type { ShapeVisitor } from "../visitors/ShapeVisitor";
import { Shape } from "./Shape";

export class Circle extends Shape {
	public x: number;
	public y: number;
	public radius: number;

	constructor(renderer: Renderer, x: number, y: number, radius: number) {
		super(renderer);
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	draw(): void {
		this.renderer.drawShape("Circle", `x:${this.x}, y:${this.y}, radius:${this.radius}`);
	}

	accept(visitor: ShapeVisitor): void {
		visitor.visitCircle(this);
	}
}

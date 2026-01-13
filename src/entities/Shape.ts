import type { Renderer } from "../renderers/Renderer";
import type { ShapeVisitor } from "../visitors/ShapeVisitor";

export abstract class Shape {
	protected renderer: Renderer;

	constructor(renderer: Renderer) {
		this.renderer = renderer;
	}

	abstract accept(visitor: ShapeVisitor): void;
	abstract draw(): void;
}

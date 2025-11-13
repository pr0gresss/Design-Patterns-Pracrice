import { ShapeValidationError } from "./ShapeValidationError";

export class SphereValidationError extends ShapeValidationError {
	constructor(message: string) {
		super("Sphere", message);
	}
}

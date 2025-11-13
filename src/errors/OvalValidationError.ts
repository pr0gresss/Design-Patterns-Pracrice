import { ShapeValidationError } from "./ShapeValidationError";

export class OvalValidationError extends ShapeValidationError {
	constructor(message: string) {
		super("Oval", message);
	}
}

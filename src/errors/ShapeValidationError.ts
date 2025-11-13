export class ShapeValidationError extends Error {
	constructor(shape: string, message: string) {
		super(`${shape} Error: ${message}`);
		this.name = "ShapeValidationError";
	}
}

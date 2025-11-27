export class ShapeServiceRegistryError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ShapeServiceRegistryError";
	}
}

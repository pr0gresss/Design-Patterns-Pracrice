export class ReadParametersError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ReadParametersError";
	}
}

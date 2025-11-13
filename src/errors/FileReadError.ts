export class FileReadError extends Error {
	constructor(filepath: string) {
		super(`Couldn't read the file at path ${filepath}`);
		this.name = "FileReadError";
	}
}

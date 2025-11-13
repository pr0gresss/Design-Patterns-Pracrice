import { FileReadError } from "../errors/FileReadError";
import { readFile } from "fs/promises";
import { ReadParametersError } from "../errors/ReadParametersError";

export class FileService {
	public async readLinesAsync(filepath: string): Promise<string[]> {
		try {
			return (await readFile(filepath, { encoding: "utf8" })).split("\n");
		} catch {
			throw new FileReadError(filepath);
		}
	}

	public readNumericParameters(line: string, delimeter: string): number[] {
		try {
			return line.split(delimeter).map(Number);
		} catch (error) {
			// Another Exception...
			throw new ReadParametersError(`Error while reading arguments: ${error}`);
		}
	}
}

import {FileReadError} from "../errors/fileReadError";
import {readFile} from "fs/promises";

export class FileSerivce {
	public async readLinesAsync(filepath: string): Promise<string[]> {
		try {
			return (await readFile(filepath, {encoding: "utf8"})).split("\n");
		} catch (error) {
			throw new FileReadError(filepath);
		}
	}

	public readNumericParameters(line: string, delimeter: string): number[] {
		try {
			return line.split(delimeter).map(entry => Number(entry));
		} catch (error) {
			// Another Exception...
			throw new Error("DEF");
		}
	}
}

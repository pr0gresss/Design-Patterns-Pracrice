import { FileService } from "../FileService";
import { FileReadError } from "../../errors/FileReadError";
import { ReadParametersError } from "../../errors/ReadParametersError";

jest.mock("fs/promises", () => ({
	readFile: jest.fn(),
}));

import { readFile } from "fs/promises";

describe("FileService", () => {
	let service: FileService;

	beforeEach(() => {
		service = new FileService();
		jest.clearAllMocks();
	});

	describe("readLinesAsync", () => {
		it("reads and splits file contents into lines", async () => {
			(readFile as jest.Mock).mockResolvedValue("a\nb\nc");

			const lines = await service.readLinesAsync("some.txt");

			expect(readFile).toHaveBeenCalledWith("some.txt", { encoding: "utf8" });
			expect(lines).toEqual(["a", "b", "c"]);
		});

		it("throws FileReadError when fs.readFile fails", async () => {
			(readFile as jest.Mock).mockRejectedValue(new Error("boom"));

			await expect(service.readLinesAsync("bad.txt")).rejects.toThrow(FileReadError);
		});
	});

	describe("readNumericParameters", () => {
		it("parses numbers correctly from string", () => {
			const line = "1 2 3 4";
			const result = service.readNumericParameters(line, " ");
			expect(result).toEqual([1, 2, 3, 4]);
		});

		it("throws ReadParametersError on invalid input", () => {
			const badInput = null as unknown as string;
			expect(() => service.readNumericParameters(badInput, " ")).toThrow(ReadParametersError);
		});
	});
});

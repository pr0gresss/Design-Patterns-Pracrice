import type { Renderer } from "./Renderer";

export class PrinterRenderer implements Renderer {
	drawShape(name: string, properties: string): void {
		console.log(`(Printer) Shape: ${name}, Properties: ${properties}`);
	}
}

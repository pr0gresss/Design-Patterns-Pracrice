import type { TransportMultiOptions } from "pino";
import { pino, transport } from "pino";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

const logDir = join(__dirname, "../../logs");
const logFileName = new Date().toLocaleDateString();

if (!existsSync(logDir)) {mkdirSync(logDir);}

const transportOptions: TransportMultiOptions = {
	targets: [
		{
			target: "pino-pretty",
			options: {
				colorize: true,
				translateTime: "SYS:standard",
				ignore: "pid,hostname",
			},
			level: "info",
		},
		{
			target: "pino/file",
			options: {
				destination: join(logDir, logFileName),
				mkdir: true,
			},
			level: "debug",
		},
	],
};

const stream = transport(transportOptions);

export const logger = pino(stream);

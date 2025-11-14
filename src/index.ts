import type { Oval } from "./entities/Oval";
import type { Sphere } from "./entities/Sphere";
import { OvalFactory } from "./factories/OvalFactory";
import { SphereFactory } from "./factories/SphereFactory";
import { FileService } from "./services/FileService";
import { OvalService } from "./services/OvalService";
import { SphereService } from "./services/SphereService";
import { logger } from "./utilities/logger";

(async () => {
	const fileService = new FileService();

	const sphereLines = await fileService.readLinesAsync(
		"./data/sample_spheres.txt",
	);
	for (const sphereLine of sphereLines) {
		try {
			const sphereParameters = fileService.readNumericParameters(
				sphereLine,
				" ",
			);
			const sphere = processSphereParameters(sphereParameters);

			if (!sphere) {
				continue;
			}

			analyzeSphere(sphere);
		} catch (error) {
			logger.error(error);
			continue;
		}
	}

	const ovalLines = await fileService.readLinesAsync("./data/sample_ovals.txt");

	for (const ovalLine of ovalLines) {
		try {
			const ovalParameters = fileService.readNumericParameters(ovalLine, " ");
			const oval = processOvalParameters(ovalParameters);

			if (!oval) {
				continue;
			}

			analyzeOval(oval);
		} catch (error) {
			logger.error(error);
			continue;
		}
	}
})();

function processOvalParameters(ovalParameters: number[]): Oval | null {
	if (ovalParameters.length !== 4 || ovalParameters.some(p => !isFinite(p))) {
		logger.warn(
			`Skipping invalid sphere parameters: ${ovalParameters.join(" ")}`,
		);
		return null;
	}

	const [
		upperLeftPointX,
		upperLeftPointY,
		bottomRightPointX,
		bottomRightPointY,
	] = ovalParameters as [number, number, number, number];

	const oval = OvalFactory.create(
		upperLeftPointX,
		upperLeftPointY,
		bottomRightPointX,
		bottomRightPointY,
	);

	logger.info(`Created oval with following parameters: ${ovalParameters}`);

	return oval;
}

function processSphereParameters(sphereParameters: number[]): Sphere | null {
	if (
		sphereParameters.length !== 4 ||
		sphereParameters.some(p => !isFinite(p))
	) {
		logger.warn(
			`Skipping invalid sphere parameters: ${sphereParameters.join(" ")}`,
		);
		return null;
	}

	const [centerPointX, centerPointY, centerPointZ, radius] =
		sphereParameters as [number, number, number, number];

	const sphere = SphereFactory.create(
		centerPointX,
		centerPointY,
		centerPointZ,
		radius,
	);

	logger.info(`Created sphere with following parameters: ${sphereParameters}`);

	return sphere;
}

function analyzeOval(oval: Oval) {
	logger.info(`Area: ${OvalService.getArea(oval)}`);
	logger.info(`Perimeter: ${OvalService.getPerimeter(oval)}`);
	logger.info(`Is oval?: ${OvalService.isOval(oval)}`);
	logger.info(
		`Intersects one axis (distance = 10)?:  ${OvalService.intersectsOneAxis(
			oval,
			10,
		)}`,
	);
	logger.info(`Is circle?: ${OvalService.isCircle(oval)}`);
}

function analyzeSphere(sphere: Sphere) {
	logger.info(`Volume: ${SphereService.getVolume(sphere)}`);
	logger.info(`Surface area: ${SphereService.getSurfaceArea(sphere)}`);
	logger.info(`Is sphere?: ${SphereService.isSphere(sphere)}`);
	logger.info(
		`Volume ratio by X axis: ${SphereService.volumeRatioByAxis(sphere, "x")}`,
	);
	logger.info(
		`Volume ratio by Y axis: ${SphereService.volumeRatioByAxis(sphere, "y")}`,
	);
	logger.info(
		`Volume ratio by Z axis: ${SphereService.volumeRatioByAxis(sphere, "z")}`,
	);
	logger.info(
		`Touches coordinate axis?: ${SphereService.touchesCoordinateAxis(sphere)}`,
	);
	logger.info(`Is sphere?: ${SphereService.isSphere(sphere)}`);
}

import type { Oval } from "./entities/Oval";
import { Point } from "./entities/Point";
import type { Sphere } from "./entities/Sphere";
import { OvalFactory } from "./factories/OvalFactory";
import { SphereFactory } from "./factories/SphereFactory";
import { ShapeRepository } from "./repositories/ShapeRepository";
import { FileService } from "./services/FileService";
import { logger } from "./utilities/logger";
import { Warehouse } from "./warehouse/Warehouse";

(async () => {
	const fileService = new FileService();
	const shapeRepository = new ShapeRepository();

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

			shapeRepository.add(sphere);

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

			shapeRepository.add(oval);

		} catch (error) {
			logger.error(error);
			continue;
		}
	}

	logger.info(shapeRepository.getAll());
})();

function processOvalParameters(ovalParameters: number[]): Oval | null {
	const wareHouse = Warehouse.getInstance();

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
	oval.subscribe(wareHouse);
	oval.changed();
	logger.info(wareHouse.getArea(oval.id));

	oval.upperLeftCorner = new Point(4,2);
	oval.changed();
	logger.info(wareHouse.getArea(oval.id));

	return oval;
}

function processSphereParameters(sphereParameters: number[]): Sphere | null {
	const wareHouse = Warehouse.getInstance();
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
	sphere.subscribe(wareHouse);
	sphere.changed();
	logger.info(wareHouse.getArea(sphere.id));

	sphere.radius = 10;
	sphere.changed();
	logger.info(wareHouse.getArea(sphere.id));


	return sphere;
}

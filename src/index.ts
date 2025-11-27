import { FirstPointXComparator } from "./comparators/FirstPointXComparator";
import { FirstPointYComparator } from "./comparators/FirstPointYComparator";
import { FirstPointZComparator } from "./comparators/FirstPointZComparator";
import { IdComparator } from "./comparators/IdComparator";
import { NameComparator } from "./comparators/NameComparator";
import type { Oval } from "./entities/Oval";
import { Point } from "./entities/Point";
import type { Shape } from "./entities/Shape";
import type { Sphere } from "./entities/Sphere";
import { OvalFactory } from "./factories/OvalFactory";
import { SphereFactory } from "./factories/SphereFactory";
import { ShapeRepository } from "./repositories/ShapeRepository";
import { FileService } from "./services/FileService";
import { AreaSpecification } from "./specifications/AreaSpecification";
import { FirstQuadrantSpecification } from "./specifications/FirstQuadrantSpecification";
import { PerimeterSpecification } from "./specifications/PerimeterSpecification";
import { VolumeSpecification } from "./specifications/VolumeSpecification";
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
			const sphere = initSphereByParameters(sphereParameters);

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
			const oval = initOvalByParameters(ovalParameters);

			if (!oval) {
				continue;
			}

			shapeRepository.add(oval);

		} catch (error) {
			logger.error(error);
			continue;
		}
	}

	logger.info("All shapes intialized");
	getRepositoryInfo(shapeRepository);
})();

function initOvalByParameters(ovalParameters: number[]): Oval | null {
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

	logger.info(`Data of oval with upper left point(x = ${oval.upperLeftCorner.x}, y = ${oval.upperLeftCorner.y}) and bottom right point(x = ${oval.bottomRightCorner.x}, y = ${oval.bottomRightCorner.y}) before changes: `);
	getWareHouseInfo<Oval>(wareHouse, oval);

	const oldUpperLeftCorner = oval.upperLeftCorner;

	const randomX = Math.round(Math.random() * 10);
	const randomY = Math.round(Math.random() * 10);
	const newUpperLeftCorner = new Point(randomX, randomY);
	logger.info(`Changed upper left point from (${oldUpperLeftCorner.x}, ${oldUpperLeftCorner.y}) to (${newUpperLeftCorner.x}, ${newUpperLeftCorner.x})`);

	oval.upperLeftCorner = newUpperLeftCorner;
	oval.changed();

	logger.info(`Data of oval with upper left point(x = ${oval.upperLeftCorner.x}, y = ${oval.upperLeftCorner.y}) and bottom right point(x = ${oval.bottomRightCorner.x}, y = ${oval.bottomRightCorner.y}) after changes: `);
	getWareHouseInfo<Oval>(wareHouse, oval);

	return oval;
}

function initSphereByParameters(sphereParameters: number[]): Sphere | null {
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

	logger.info(`Data of sphere with points (x = ${sphere.centerPoint.x}, y = ${sphere.centerPoint.y}, z = ${sphere.centerPoint.z}, radius = ${sphere.radius}) before changes: `);
	getWareHouseInfo<Sphere>(wareHouse, sphere);

	const oldRadius = sphere.radius;
	const newRadius = Math.round(oldRadius * Math.random() * 5);

	logger.info(`Changed sphere radius from ${oldRadius} to ${newRadius}`);
	sphere.radius = newRadius;
	sphere.changed();

	logger.info(`Data of sphere with points (x = ${sphere.centerPoint.x}, y = ${sphere.centerPoint.y}, z = ${sphere.centerPoint.z}, radius = ${sphere.radius}) after changes: `);
	getWareHouseInfo<Sphere>(wareHouse, sphere);

	return sphere;
}

function getWareHouseInfo<T extends Shape>(wh: Warehouse, shape: T): void {
	logger.info("Warehouse info: ");
	logger.info(`Area: ${wh.getArea(shape.id)}`);
	logger.info(`Perimeter: ${wh.getPerimeter(shape.id)}`);
	logger.info(`Volume: ${wh.getVolume(shape.id)}`);
}

function getRepositoryInfo(shapeRepository: ShapeRepository<Shape>): void {
	logger.info("Repository info:");
	logger.info(`All ovals: ${formatShapes(shapeRepository.findByName("Oval"))}`);
	logger.info(`All spheres: ${formatShapes(shapeRepository.findByName("Sphere"))}`);

	logger.info(`All shapes with area from 10 to 100: ${formatShapes(shapeRepository.findBySpecification(new AreaSpecification(10, 100)))}`);
	logger.info(`All shapes with perimeter from 5 to 10: ${formatShapes(shapeRepository.findBySpecification(new PerimeterSpecification(5, 10)))}`);
	logger.info(`All shapes with volume from 5 to 100: ${formatShapes(shapeRepository.findBySpecification(new VolumeSpecification(5, 100)))}`);
	logger.info(`All shapes that are in 1st quadrant: ${formatShapes(shapeRepository.findBySpecification(new FirstQuadrantSpecification()))}`);

	logger.info(`Sorted shapes by name: ${formatShapes(shapeRepository.sortBy(new NameComparator()))}`);
	logger.info(`Sorted shapes by id: ${formatShapes(shapeRepository.sortBy(new IdComparator()))}`);
	logger.info(`Sorted shapes by first point x coord: ${formatShapes(shapeRepository.sortBy(new FirstPointXComparator()))}`);
	logger.info(`Sorted shapes by first point y coord: ${formatShapes(shapeRepository.sortBy(new FirstPointYComparator()))}`);
	logger.info(`Sorted shapes by first point z coord: ${formatShapes(shapeRepository.sortBy(new FirstPointZComparator()))}`);

}

function formatShapes(shapes: Shape[]): string {
	return shapes
		.map(s => `${s.name}(id=${s.id})`)
		.join(", ");
}

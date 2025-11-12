import {OvalFactory} from "./factories/ovalFactory";
import {FileSerivce} from "./services/fileService";
import {OvalSerice} from "./services/ovalService";

(async () => {
	const fileService = new FileSerivce();

	const ovalLines = await fileService.readLinesAsync(
		"./assets/sample_ovals.txt"
	);

	for (const ovalLine of ovalLines) {
		try {
			const numericParameters = fileService.readNumericParameters(
				ovalLine,
				" "
			);

			if (
				numericParameters.length != 4 ||
				numericParameters.some(p => !isFinite(p))
			)
				continue;

			const [
				upperLeftPointX,
				upperLeftPointY,
				bottomRightPointX,
				bottomRightPointY,
			] = numericParameters as [number, number, number, number];

			const oval = OvalFactory.create(
				upperLeftPointX,
				upperLeftPointY,
				bottomRightPointX,
				bottomRightPointY
			);

			// Replace with logger
			console.log(OvalSerice.getPerimeter(oval));
			console.log(OvalSerice.isOval(oval));
			console.log(OvalSerice.isCircle(oval));
			console.log(OvalSerice.intersectsOneAxis(oval, 10));
		} catch (error) {
			console.error(error);
		}
	}
})();

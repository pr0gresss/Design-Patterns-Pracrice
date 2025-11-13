export class OvalValidator {
	public static validate(
		upperLeftPointX: number,
		upperLeftPointY: number,
		bottomRightPointX: number,
		bottomRightPointY: number,
	): boolean {
		return (
			upperLeftPointX !== bottomRightPointX &&
			upperLeftPointY !== bottomRightPointY
		);
	}
}

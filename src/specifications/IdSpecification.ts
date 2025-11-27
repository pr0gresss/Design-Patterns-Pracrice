import type { Specification } from "./Specification";

export class IdSpecification<T extends {id: string}> implements Specification<T> {
	constructor(private id: string) {}

	isSatisfiedBy(obj: T): boolean {
		return obj.id === this.id;
	}
}

import type { Specification } from "./Specification";

export class NameSpecification<T extends {name: string}> implements Specification<T> {
	constructor(private name: string) {}

	isSatisfiedBy(obj: T): boolean {
		return obj.name === this.name;
	}
}

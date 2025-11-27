export interface Specification<T> {
	isSatisfiedBy(obj: T): boolean;
}

import type { Comparator } from "../comparators/Comparator";
import type { Shape } from "../entities/Shape";
import type { Specification } from "../specifications/Specification";

export interface IShapeRepository<T extends Shape> {
	shapes: Map<string, Shape>;
	add(shape: T): void;
	getAll(): T[];
	removeById(id: string): void;
	findById(id: string): T | null;
	findByName(name: string): T[];
	findBySpecification(spec: Specification<T>): T[];
	sortBy(comparator: Comparator<T>): T[];
}

export class ShapeRepository<T extends Shape> implements IShapeRepository<T> {
	public shapes = new Map();

	public add(shape: T): void {
		this.shapes.set(shape.id, shape);
	}

	public getAll(): T[] {
		return Array.from(this.shapes.values());
	}

	public removeById(id: string): void {
		this.shapes.delete(id);
	}

	public findById(id: string): T | null {
		return this.shapes.get(id) ?? null;
	}

	public findByName(name: string): T[] {
		return Array.from(this.shapes.values()).filter((shape: T) => shape.name === name);
	}

	public findBySpecification(specification: Specification<T>): T[] {
		return Array.from(this.shapes.values()).filter((shape: T) => specification.isSatisfiedBy(shape));
	}

	public sortBy(comparator: Comparator<T>): T[] {
		return Array.from(this.shapes.values()).sort((a,b) => comparator.compare(a,b));
	}
}

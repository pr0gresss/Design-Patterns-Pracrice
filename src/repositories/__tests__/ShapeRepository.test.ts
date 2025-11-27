import { ShapeRepository } from "../ShapeRepository";
import { Shape } from "../../entities/Shape";
import type { Comparator } from "../../comparators/Comparator";
import type { Specification } from "../../specifications/Specification";

class TestShape extends Shape {
	constructor(id: string, name: string) {
		super(name);
		this.id = id;
	}
}

class TestComparator implements Comparator<TestShape> {
	public compare(a: TestShape, b: TestShape): number {
		return a.id.localeCompare(b.id);
	}
}

class TestSpec implements Specification<TestShape> {
	constructor(private readonly fn: (s: TestShape) => boolean) {}
	public isSatisfiedBy(s: TestShape): boolean {
		return this.fn(s);
	}
}

describe("ShapeRepository (with real Shape)", () => {
	let repo: ShapeRepository<TestShape>;

	beforeEach(() => {
		repo = new ShapeRepository<TestShape>();
	});

	it("adds and retrieves shapes", () => {
		const s = new TestShape("1", "Circle");

		repo.add(s);

		expect(repo.shapes.size).toBe(1);
		expect(repo.findById("1")).toBe(s);
	});

	it("getAll returns all stored shapes", () => {
		const a = new TestShape("1", "Circle");
		const b = new TestShape("2", "Square");

		repo.add(a);
		repo.add(b);

		const list = repo.getAll();

		expect(list.length).toBe(2);
		expect(list).toContain(a);
		expect(list).toContain(b);
	});

	it("removeById removes an existing shape", () => {
		const s = new TestShape("1", "Circle");
		repo.add(s);

		repo.removeById("1");

		expect(repo.findById("1")).toBeNull();
		expect(repo.shapes.size).toBe(0);
	});

	it("findById returns shape or null", () => {
		const s = new TestShape("1", "Circle");
		repo.add(s);

		expect(repo.findById("1")).toBe(s);
		expect(repo.findById("999")).toBeNull();
	});

	it("findByName returns all shapes with a matching name", () => {
		const a = new TestShape("1", "Circle");
		const b = new TestShape("2", "Circle");
		const c = new TestShape("3", "Triangle");

		repo.add(a);
		repo.add(b);
		repo.add(c);

		const found = repo.findByName("Circle");

		expect(found?.length).toBe(2);
		expect(found).toContain(a);
		expect(found).toContain(b);
	});

	it("findBySpecification filters by provided spec", () => {
		const a = new TestShape("1", "Circle");
		const b = new TestShape("2", "Square");

		repo.add(a);
		repo.add(b);

		const spec = new TestSpec(shape => shape.name === "Square");
		const result = repo.findBySpecification(spec);

		expect(result?.length).toBe(1);
		expect(result?.[0]).toBe(b);
	});

	it("sortBy returns shapes sorted using comparator", () => {
		const a = new TestShape("2", "B");
		const b = new TestShape("1", "A");

		repo.add(a);
		repo.add(b);

		const comparator = new TestComparator();
		const sorted = repo.sortBy(comparator);

		expect(sorted?.map(s => s.id)).toEqual(["1", "2"]);
	});
});

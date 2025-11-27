import { IdComparator } from "../IdComparator";

interface Item {
	id: string;
}

function makeItem(id: string): Item {
	return { id };
}

describe("IdComparator", () => {
	let comparator: IdComparator<Item>;

	beforeEach(() => {
		comparator = new IdComparator<Item>();
	});

	it("implements the Comparator contract (has compare method)", () => {
		expect(typeof comparator.compare).toBe("function");
		expect(typeof comparator.compare(makeItem("a"), makeItem("b"))).toBe("number");
	});

	it("returns 0 when ids are equal", () => {
		const a = makeItem("abc");
		const b = makeItem("abc");

		expect(comparator.compare(a, b)).toBe(0);
	});

	it("returns a negative number when a.id < b.id", () => {
		const a = makeItem("abc");
		const b = makeItem("def");

		expect(comparator.compare(a, b)).toBeLessThan(0);
	});

	it("returns a positive number when a.id > b.id", () => {
		const a = makeItem("xyz");
		const b = makeItem("def");

		expect(comparator.compare(a, b)).toBeGreaterThan(0);
	});

	it("compares strings using localeCompare behavior", () => {
		const a = makeItem("a");
		const b = makeItem("A");

		expect(comparator.compare(a, b)).toBe("a".localeCompare("A"));
	});
});

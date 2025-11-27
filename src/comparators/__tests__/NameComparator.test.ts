import { NameComparator } from "../NameComparator";

interface Item {
	name: string;
}

function makeItem(name: string): Item {
	return { name };
}

describe("NameComparator", () => {
	let comparator: NameComparator<Item>;

	beforeEach(() => {
		comparator = new NameComparator<Item>();
	});

	it("returns 0 when names are equal", () => {
		const a = makeItem("alpha");
		const b = makeItem("alpha");

		expect(comparator.compare(a, b)).toBe(0);
	});

	it("returns a negative number when a.name < b.name", () => {
		const a = makeItem("alpha");
		const b = makeItem("beta");

		expect(comparator.compare(a, b)).toBeLessThan(0);
	});

	it("returns a positive number when a.name > b.name", () => {
		const a = makeItem("gamma");
		const b = makeItem("beta");

		expect(comparator.compare(a, b)).toBeGreaterThan(0);
	});

	it("uses localeCompare semantics", () => {
		const a = makeItem("a");
		const b = makeItem("A");

		expect(comparator.compare(a, b)).toBe("a".localeCompare("A"));
	});
});

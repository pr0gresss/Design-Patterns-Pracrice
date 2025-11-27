import type { Comparator } from "./Comparator";

export class NameComparator<T extends {name: string}> implements Comparator<T> {
	public compare(a: T, b: T): number {
		return a.name.localeCompare(b.name);
	}
}

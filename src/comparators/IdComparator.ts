import type { Comparator } from "./Comparator";

export class IdComparator<T extends {id: string}> implements Comparator<T> {
	public compare(a: T, b: T): number {
		return a.id.localeCompare(b.id);
	}
}

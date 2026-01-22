import {ResourceAdapter} from "./ResourceAdapter";
import {LegacyResource} from "../resources/LegacyResource";

export class LegacyResourceAdapter implements ResourceAdapter<LegacyResource> {
	readonly id: string;

	constructor(private legacy: LegacyResource) {
		this.id = legacy.getName();
	}

	use(): void {
		this.legacy.execute();
	}

	getOriginal(): LegacyResource {
		return this.legacy;
	}
}

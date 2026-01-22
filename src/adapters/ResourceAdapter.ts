import { Resource } from "../resources/Resource"

export interface ResourceAdapter<T> extends Resource {
  getOriginal(): T
}

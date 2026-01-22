import { Resource } from "../resources/Resource"
import { ObservableBase } from "../observers/ObservableBase"
import { PoolEvent } from "./PoolEvents"

export class ObjectPool extends ObservableBase<PoolEvent> {
  private static instance: ObjectPool

  private available: Resource[] = []
  private inUse = new Set<Resource>()

  private constructor() {
    super()
  }

  static getInstance(): ObjectPool {
    if (!ObjectPool.instance) {
      ObjectPool.instance = new ObjectPool()
    }
    return ObjectPool.instance
  }

  addResource(resource: Resource): void {
    this.available.push(resource)
  }

  acquire(): Resource | null {
    const resource = this.available.pop()

    if (!resource) {
      this.notify({ type: "POOL_EMPTY" })
      return null
    }

    this.inUse.add(resource)
    return resource
  }

  release(resource: Resource): void {
    if (!this.inUse.has(resource)) return

    this.inUse.delete(resource)
    this.available.push(resource)

    this.notify({
      type: "RESOURCE_AVAILABLE",
      resourceId: resource.id
    })
  }
}

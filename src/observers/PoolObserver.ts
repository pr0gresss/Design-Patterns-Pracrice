import { Observer } from "./Observer"
import { PoolEvent } from "../pool/PoolEvents"

export class PoolObserver implements Observer<PoolEvent> {
  update(event: PoolEvent): void {
    switch (event.type) {
      case "RESOURCE_AVAILABLE":
        console.log(
          `[Observer] Resource available: ${event.resourceId}`
        )
        break

      case "POOL_EMPTY":
        console.warn(
          `[Observer] Pool is empty`
        )
        break

      default:
        this.assertNever(event)
    }
  }

  private assertNever(event: never): never {
    throw new Error(`Unhandled event: ${JSON.stringify(event)}`)
  }
}

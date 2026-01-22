export type PoolEvent =
  | { type: "RESOURCE_AVAILABLE"; resourceId: string }
  | { type: "POOL_EMPTY" }

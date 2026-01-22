import {ObjectPool} from "./pool/ObjectPool";
import {LegacyResource} from "./resources/LegacyResource";
import {LegacyResourceAdapter} from "./adapters/LegacyResourceAdapter";
import {PoolObserver} from "./observers/PoolObserver";

const pool = ObjectPool.getInstance();

pool.subscribe(new PoolObserver());

const legacy1 = new LegacyResource("legacy-1");
const legacy2 = new LegacyResource("legacy-2");

pool.addResource(new LegacyResourceAdapter(legacy1));
pool.addResource(new LegacyResourceAdapter(legacy2));

const r1 = pool.acquire();
r1?.use();

const r2 = pool.acquire();
r2?.use();

const r3 = pool.acquire(); // triggers POOL_EMPTY

if (r1) pool.release(r1);
if (r2) pool.release(r2);

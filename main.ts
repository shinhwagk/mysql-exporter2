import * as log from "https://deno.land/std/log/mod.ts";
import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";

import {
  Counter,
  globalRegistry as registry,
} from "https://cdn.jsdelivr.net/gh/shinhwagk/prom-client/mod.ts";
import { digests } from "./collector/digest1.ts";

const s = serve({ hostname: "0.0.0.0", port: 8000 });



const scrapers = {
  "xxx": digests
}

console.log("http://0.0.0.0:8000/");
for await (const req of s) {
  if (req.url === "/metrics") {
    req.respond({ body: registry.metrics() });
  } else {
    req.respond({ body: "Hello World\n" });
  }
}

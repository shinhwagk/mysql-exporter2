import { Client } from "https://cdn.jsdelivr.net/gh/shinhwagk/deno_mysql@2.0.1/mod.ts";

import {
  Metric,
} from "https://cdn.jsdelivr.net/gh/shinhwagk/prom-client/mod.ts";
import { ds } from "./collector/digest1.ts";
import { Scraper, MultiVersionScraper } from "./collector/scraper.ts";

class Exporter {
  constructor(readonly mvScrapers: MultiVersionScraper[]) {
  }
  async scrape() {
    const startScrapeTime = Date.now();
    const client = await new Client().connect(
      {
        hostname: "10.65.193.30",
        username: "root",
        db: "test",
        password: "mysql",
      },
    );

    const dbVersion = await getMySQLVersion(client);

    const ss = [];
    for (const s of this.mvScrapers) {
      const scraper: Scraper | null = s.pickVersion(dbVersion);
      if (!scraper) {
        continue;
      }
      ss.push((async () => {
        const scrapeTime = Date.now();
        await scraper.Scrape(client);
        console.log(Date.now() - scrapeTime);
      })());
    }
    // Promise.all();
  }
}

const scrapers = [ds];

async function getMySQLVersion(client: Client): Promise<string> {
  const rs = await client.query("SELECT @@version");
  const ver = rs[0]["@@version"];
  const versionRE = /^\d+\.\d+/;
  const r = versionRE.exec(ver);
  if (r) {
    return r[0];
  } else {
    return "999";
  }
}

import {
  Counter,
} from "https://cdn.jsdelivr.net/gh/shinhwagk/prom-client/mod.ts";

import { Client } from "https://cdn.jsdelivr.net/gh/shinhwagk/deno_mysql@2.0.1/mod.ts";

import { Scraper } from "./scraper.ts";

class process implements Scraper {
  async Scrape(client: Client) {
    try {
      await client.query("select 1");
    } catch (e) {
      console.log(e);
    }
  }
}

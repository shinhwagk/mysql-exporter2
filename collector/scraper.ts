import { Client } from "https://cdn.jsdelivr.net/gh/shinhwagk/deno_mysql@2.0.1/mod.ts";

export interface Scraper {
  version: string;
  Name(): string;
  Help(): string;
  Scrape(db: Client): Promise<void>;
}

export class MultiVersionScraper {
  scrapers: Scraper[] = []
  constructor(...scrapers: Scraper[]) {
    scrapers.forEach(x => this.scrapers.push(x))
  }

  pickVersion(dbVeresion: string): Scraper | null {
    for (const scraper of this.scrapers) {
      if (scraper.version == dbVeresion) {
        return scraper
      }
    }
    return null
  }
}

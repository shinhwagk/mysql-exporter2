import {
  Counter,
} from "https://cdn.jsdelivr.net/gh/shinhwagk/prom-client/mod.ts";

import { Client } from "https://cdn.jsdelivr.net/gh/shinhwagk/deno_mysql@2.0.1/mod.ts";

import { Scraper, MultiVersionScraper } from "./scraper.ts";

abstract class Digest implements Scraper {
  abstract version: string;
  abstract Scrape(db: Client): Promise<void>;
  Name(): string {
    return "digest";
  }
  Help(): string {
    return "aaaaa";
  }
}

class Digest_56 extends Digest {
  version = "5.6";
  async Scrape(client: Client) {
    console.log("start 56");
    await sc56(client);
  }
}

class Digest_80 extends Digest {
  version = "8.0";
  async Scrape(client: Client) {
    try {
      await client.query("select 1");
    } catch (e) {
      console.log(e);
    }
  }
}
const sql_56 = `SELECT
schema_name,
md5(digest) digest,
count_star,
sum_timer_wait,
sum_lock_time,
sum_errors,
sum_warnings,
sum_rows_affected,
sum_rows_sent,
sum_rows_examined,
sum_created_tmp_disk_tables,
sum_created_tmp_tables,
sum_select_full_join,
sum_select_full_range_join,
sum_select_range,
sum_select_range_check,
sum_select_scan,
sum_sort_merge_passes,
sum_sort_range,
sum_sort_rows,
sum_sort_scan,
sum_no_index_used,
sum_no_good_index_used
FROM performance_schema.events_statements_summary_by_digest
WHERE schema_name NOT IN ('mysql', 'performance_schema', 'information_schema') limit 1`;

const x: { [name: string]: Counter } = {
  count_star: new Counter(
    `mysql_perf_schema_events_statements_count_star_total`,
    "",
    ["schema", "digest"],
  ),
  sum_timer_wait: new Counter(
    `mysql_perf_schema_events_statements_timer_wait_total`,
    "",
    ["schema", "digest"],
  ),
};

async function sc56(client: Client) {
  console.log("query");
  try {
    for (const row of await client.query(sql_56)) {
      console.log(row);
      // const schema = row["schema_name"];
      // const digest = row["digest"];
      // console.log(schema, digest);
      // for (const [row_k, row_v] of Object.entries(row)) {
      //   console.log(row_k);
      //   const metric = x[row_k];
      //   if (metric) {
      //     console.log(row_v);
      //     metric.inc(row_v as number, { "schema": schema, "digest": digest });
      //   }
      // }
    }
  } catch (e) {
    console.log(e.message);
  }
}

export const digests = new MultiVersionScraper(new Digest_56(), new Digest_56(), new Digest_80());

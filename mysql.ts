import Dex from "https://deno.land/x/dex/mod.ts";
import Dexecutor from "https://deno.land/x/dexecutor/mod.ts";

const client = "mysql";

let dex = new Dex({
  client: client
});

let dexecutor = new Dexecutor({
  client: client,
  connection: {
    host: "10.65.193.30",
    user: "zhangxu",
    password: "zhangxu",
    port: 3306,
    database: "test",
  }
});

await dexecutor.connect();

const cols = ['schema_name', 'digest',
  'count_star',
  'sum_timer_wait',
  'sum_lock_time',
  'sum_errors',
  'sum_warnings',
  'sum_rows_affected',
  'sum_rows_sent',
  'sum_rows_examined',
  'sum_created_tmp_disk_tables',
  'sum_created_tmp_tables',
  'sum_select_full_join',
  'sum_select_full_range_join',
  'sum_select_range',
  'sum_select_range_check',
  'sum_select_scan',
  'sum_sort_merge_passes',
  'sum_sort_range',
  'sum_sort_rows',
  'sum_sort_scan',
  'sum_no_index_used',
  'sum_no_good_index_used']

for (const col of cols) {
  console.info(col)
  let result = await dexecutor.execute(
    dex.queryBuilder()
      .select(`${col}`)
      .from("performance_schema.events_statements_summary_by_digest")
      .limit(10)
      .toString()
  );

  console.log(col);

}
// console.log("222")
// console.log(await client.query("select * from performance_schema.events_statements_summary_by_digest limit 100"));
// console.log("2223")
// const d = digests.pickVersion("5.6");
// if (d) {
//   console.log("pre start");
//   await d.Scrape(client);
//   console.log("succss start");
//   // console.log(globalRegistry.metrics());
// }

// await client.close();


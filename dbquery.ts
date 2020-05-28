const queryApiUrl = "http://10.65.103.78:8001/query";
interface QueryContent {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  sqltext: string;
  args: any[];
}

async function dbquery(qc: QueryContent) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  const req = new Request(
    queryApiUrl,
    { method: "POST", body: JSON.stringify(qc), headers: headers },
  );

  const res = await fetch(req);
  console.log(await res.json());
}

const qc = {
  "host": "10.65.193.30",
  "port": 3306,
  "user": "root",
  "password": "mysql",
  "database": "",
  "sqltext": "select @@version",
  "args": [],
};

dbquery(qc);

import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://95.217.117.251:9200/",
  // node: 'http://18.168.167.144:9200/',
  auth: {
    username: "elastic",
    password: "d41=*sDuOnhQqXonYz2U",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default client;

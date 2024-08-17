import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://35.179.127.117:9200/', 
  auth: {
    username: 'elastic', 
    password: 'fpvwXyKEHfw3IaoCJKBZ'  
  },
  tls:{
    rejectUnauthorized: false
  }
});

export default client;

import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://18.168.167.144:9200/', 
  auth: {
    username: 'elastic', 
    password: 'fpvwXyKEHfw3IaoCJKBZ'  
  },
  tls:{
    rejectUnauthorized: false
  }
});

export default client;

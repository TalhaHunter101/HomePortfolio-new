import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'https:13.43.222.132:9200', 
  auth: {
    username: 'elastic', 
    password: 'scFQhlmk=X6-QGnjHOd8'  
  },
  tls:{
    rejectUnauthorized: false
  }
});

export default client;

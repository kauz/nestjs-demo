import config from '@root/config';

const dbConfig = {
  client: 'pg',
  connection: {
    host: config.get('db.host'),
    port: config.get('db.port'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.name'),
  },
  pool: { min: 2, max: 30 },
  debug: false
};

export { dbConfig };

import { Pool } from 'pg';

export const pool = new Pool ({
  max: 20,
  connectionString: 'postgres://postgres:postgres@127.0.0.1:5432/cleannode',
  idleTimeoutMillis: 30000
});
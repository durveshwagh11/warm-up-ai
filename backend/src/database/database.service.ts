import { Injectable } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

@Injectable()
export class DatabaseService {
  public db;

  constructor() {
    const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
    this.db = drizzle(sql, { schema });
  }
}

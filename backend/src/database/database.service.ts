import { Injectable } from '@nestjs/common';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import 'dotenv/config';

@Injectable()
export class DatabaseService {
  public db;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql, { schema });

    this.testConnection().catch((err) => {
      console.error('Database connection failed:', err);
    });
  }

  private async testConnection() {
    const result = await this.db.execute('SELECT NOW()');
    console.log('Database connected:', result.rows[0]);
  }
}

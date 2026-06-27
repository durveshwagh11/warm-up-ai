import 'dotenv/config';

/** @type { import("drizzle-kit").Config } */
export default {
  client: 'pg',
  schema: './src/database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  },
};

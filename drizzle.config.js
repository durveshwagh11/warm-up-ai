/** @type { import("drizzle-kit").Config } */
export default {
  client: 'pg',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://durveshwagh11:HPdDpcL94ybx@ep-crimson-flower-a5023mw5.us-east-2.aws.neon.tech/warm-up-ai?sslmode=require',
  },
};

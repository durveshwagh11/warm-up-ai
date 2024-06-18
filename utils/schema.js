import { serial, text, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("MockInterview", {
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition', { length: 255 }).notNull(),
    jobDesc: varchar('jobDesc', { length: 255 }).notNull(),
    jobExperience: varchar('jobExperience', { length: 255 }).notNull(),
    createdBy: varchar('createdBy', { length: 255 }).notNull(),
    createdAt: varchar('createdAt', { length: 255 }).notNull(),
    mockId: varchar('mockId', { length: 255 }).notNull().unique(),
});

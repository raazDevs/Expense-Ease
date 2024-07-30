import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon("postgresql://expense_tracker_owner:QkWV2cpJaC7R@ep-long-hill-a5i0edzc.us-east-2.aws.neon.tech/expense_tracker?sslmode=require");
export const db = drizzle(sql,{schema});

import { Pool, PoolConfig } from "pg";
const poolconfig: PoolConfig = {
	user: process.env.NEXT_PUBLIC_POSTGRES_USER,
	password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
	host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
	port: parseInt(process.env.NEXT_PUBLIC_POSTGRES_PORT),
	database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE,
};
export const pool: Pool = new Pool(poolconfig);

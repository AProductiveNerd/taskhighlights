import { QueryResult } from "pg";
import { pool } from "../db";
const format = require("pg-format");

export const getAllFromTable = async (
	table: string
): Promise<QueryResult> => {
	const formatted: string = await format("SELECT * FROM %I", table);

	return await pool.query(formatted);
};

export const getAllFromTableWhere = async (
	table: string,
	column: string,
	id: number | string | boolean
): Promise<QueryResult> => {
	const formatted: string = await format(
		"SELECT * FROM %I WHERE %I = %L",
		table.toLowerCase(),
		column.toLowerCase(),
		id
	);

	return await pool.query(formatted);
};

export const createNewTask = async (
	description: string,
	done: boolean
): Promise<QueryResult> => {
	const formatted = format(
		"INSERT INTO todo (description, done) VALUES(%L, %L) RETURNING *",
		description,
		done
	);

	return await pool.query(formatted);
};

export const deleteTableColumnFromId = async (
	table: string,
	column: string,
	id: number
): Promise<QueryResult> => {
	const formatted = format(
		"DELETE FROM %I WHERE %I = %L",
		table.toLowerCase(),
		column.toLowerCase(),
		id
	);

	return await pool.query(formatted);
};

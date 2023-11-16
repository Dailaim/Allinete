import { server$ } from "@builder.io/qwik-city";
import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { Surreal } from "surrealdb.js";

export const database = new Surreal();

export const connect = {
	value: false,
};

export const DB = server$(async function (env?: EnvGetter) {
	if (connect.value) {
		return database;
	}

	const getEnv = env?.get ?? this?.env?.get;

	if (!getEnv) {
		throw new Error("No env getter found");
	}

	const url = getEnv("DB_URL") ?? "";
	const user = getEnv("DB_USER") ?? "";
	const pass = getEnv("DB_PASSWORD") ?? "";
	const name = getEnv("DB_NAME") ?? "";
	const namespace = getEnv("DB_NAMESPACE") ?? "";

	// Use any of these 3 connect methods to connect to the database
	// 1.Connect to the database
	await database.connect(url).catch((err) => {
		console.error(err, "Error connecting to database");
	});

	// Signin as a namespace, database, or root user
	await database
		.signin({
			user: user,
			pass: pass,
		})
		.catch((err) => {
			console.error(err, "Error signing into database");
		});

	// Select a specific namespace / database
	await database.use({ ns: namespace, db: name }).catch((err) => {
		console.error(err, "Error selecting namespace");
	});

	connect.value = true;

	return database;
});

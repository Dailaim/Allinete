import { server$ } from "@builder.io/qwik-city";
import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { Surreal } from "surrealdb-http";

export const DB = server$(async function (env?: EnvGetter) {
	const getEnv = env?.get ?? this?.env?.get;

	if (!getEnv) {
		throw new Error("No env getter found");
	}

	const url = getEnv("DB_URL") ?? "";
	const user = getEnv("DB_USER") ?? "";
	const pass = getEnv("DB_PASSWORD") ?? "";
	const name = getEnv("DB_NAME") ?? "";
	const namespace = getEnv("DB_NAMESPACE") ?? "";

	const database = new Surreal();

	// Use any of these 3 connect methods to connect to the database
	// 1.Connect to the database
	await database.connect(url, {
		auth: {
			pass: pass,
			user: user,
		},
		db: name,
		ns: namespace,
	});

	return database;
});

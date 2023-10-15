import { Surreal } from "surrealdb.js";

export const db = new Surreal();

async function main() {
	try {
		// Use any of these 3 connect methods to connect to the database
		// 1.Connect to the database
		await db.connect("http://127.0.0.1:8080/rpc");

		// Signin as a namespace, database, or root user
		await db.signin({
			user: "root",
			pass: "root",
		});

		// Select a specific namespace / database
		await db.use({ ns: "test", db: "test" });
	} catch (e) {
		console.error("ERROR Connection Database", e);
	}
}

main();

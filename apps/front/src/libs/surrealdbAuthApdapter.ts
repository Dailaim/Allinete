/**
 * <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
 *  <p style={{fontWeight: "normal"}}>Official <a href="https://www.surrealdb.com">SurrealDB</a> adapter for Auth.js / NextAuth.js.</p>
 *  <a href="https://www.surrealdb.com">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/adapters/surrealdb.png" width="30" />
 *  </a>
 * </div>
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install @auth/surrealdb-adapter surrealdb.js
 * ```
 *
 * @module @auth/surrealdb-adapter
 */

import type {
	Adapter,
	AdapterAccount,
	AdapterSession,
	AdapterUser,
	VerificationToken,
} from "@auth/core/adapters";
import type { ProviderType } from "@auth/core/providers";
import type { ExperimentalSurrealHTTP } from "surrealdb.js";
import type Surreal from "surrealdb.js";

type Document = Record<string, string | null | undefined> & { id: string };
export type UserDoc = Document & { email: string };
export type AccountDoc<T = string> = {
	id: string;
	userId: T;
	refresh_token?: string;
	access_token?: string;
	type: Extract<ProviderType, "oauth" | "oidc" | "email">;
	provider: string;
	providerAccountId: string;
	expires_at?: number;
};
export type SessionDoc<T = string> = Document & { userId: T };

const extractId = (surrealId: string) => surrealId.split(":")[1] ?? surrealId;

/** @internal */
// Convert DB object to AdapterUser
export const docToUser = (doc: UserDoc): AdapterUser => ({
	...doc,
	id: extractId(doc.id),
	emailVerified: doc.emailVerified ? new Date(doc.emailVerified) : null,
});

/** @internal */
// Convert DB object to AdapterAccount
export const docToAccount = (doc: AccountDoc) => {
	const account: AdapterAccount = {
		...doc,
		id: extractId(doc.id),
		userId: doc.userId ? extractId(doc.userId) : "",
	};
	return account;
};

/** @internal */
// Convert DB object to AdapterSession
export const docToSession = (
	doc: SessionDoc<string | UserDoc>,
): AdapterSession => ({
	userId: extractId(
		typeof doc.userId === "string" ? doc.userId : doc.userId.id,
	),
	expires: new Date(doc.expires ?? ""),
	sessionToken: doc.sessionToken ?? "",
});

/** @internal */
// Convert AdapterUser to DB object
const userToDoc = (
	user: Omit<AdapterUser, "id"> | Partial<AdapterUser>,
): Omit<UserDoc, "id"> => {
	const doc = {
		...user,
		emailVerified: user.emailVerified?.toISOString(),
	};
	return doc;
};

/** @internal */
// Convert AdapterAccount to DB object
const accountToDoc = (account: AdapterAccount): Omit<AccountDoc, "id"> => {
	const doc = {
		...account,
		userId: `user:${account.userId}`,
	};
	return doc;
};

/** @internal */
// Convert AdapterSession to DB object
export const sessionToDoc = (
	session: AdapterSession,
): Omit<SessionDoc, "id"> => {
	const doc = {
		...session,
		expires: session.expires.toISOString(),
	};
	return doc;
};

/**
 * ## Setup
 *
 * The SurrealDB adapter does not handle connections automatically, so you will have to make sure that you pass the Adapter a `SurrealDBClient` that is connected already. Below you can see an example how to do this.
 *
 * ### Add the SurrealDB client
 *
 * #### Option 1/2 – Using RPC:
 *
 * ```js
 * import { Surreal } from "surrealdb.js";
 *
 * const connectionString = ... // i.e. "http://0.0.0.0:8000"
 * const user = ...
 * const pass = ...
 * const ns = ...
 * const db = ...
 *
 * const clientPromise = new Promise<Surreal>(async (resolve, reject) => {
 *   const db = new Surreal();
 *   try {
 *     await db.connect(`${connectionString}/rpc`, {
 *       ns, db, auth: { user, pass }
 *     })
 *     resolve(db)
 *   } catch (e) {
 *     reject(e)
 *   }
 * })
 *
 * // Export a module-scoped MongoClient promise. By doing this in a
 * // separate module, the client can be shared across functions.
 * export default clientPromise
 * ```
 *
 * #### Option 2/2 – Using HTTP:
 *
 * Usefull in serverlees environments like Vercel.
 *
 * ```js
 * import { ExperimentalSurrealHTTP } from "surrealdb.js"
 *
 * const connectionString = ... // i.e. "http://0.0.0.0:8000"
 * const user = ...
 * const pass = ...
 * const ns = ...
 * const db = ...
 *
 * const clientPromise = new Promise<ExperimentalSurrealHTTP<typeof fetch>>(async (resolve, reject) => {
 *   try {
 *     const db = new ExperimentalSurrealHTTP(connectionString, {
 *       fetch,
 *       ns, db, auth: { user, pass }
 *     })
 *     resolve(db)
 *   } catch (e) {
 *     reject(e)
 *   }
 * })
 *
 * // Export a module-scoped MongoClient promise. By doing this in a
 * // separate module, the client can be shared across functions.
 * export default clientPromise
 * ```
 *
 * ### Configure Auth.js
 *
 * ```js
 * import NextAuth from "next-auth"
 * import { SurrealDBAdapter } from "@auth/surrealdb-adapter"
 * import clientPromise from "../../../lib/surrealdb"
 *
 * // For more information on each option (and a full list of options) go to
 * // https://authjs.dev/reference/providers/oauth
 * export default NextAuth({
 *   adapter: SurrealDBAdapter(clientPromise),
 *   ...
 * })
 * ```
 **/
export function SurrealDBAdapter<T>(
	client:
		| Promise<Surreal | ExperimentalSurrealHTTP<T>>
		| (Surreal | ExperimentalSurrealHTTP<T>),
	// options = {}
): Adapter {
	return {
		async createUser(user: Omit<AdapterUser, "id">) {
			const surreal = await client;

			const doc = userToDoc(user);

			const userDoc = await surreal
				.create<UserDoc, Omit<UserDoc, "id">>("user", doc)
				.catch(() => []);

			if (!userDoc.length) throw new Error("User not created");

			return docToUser(userDoc[0]);
		},

		async getUser(id: string) {
			const surreal = await client;

			const queryResult = await surreal
				.query<[UserDoc[]]>("SELECT * FROM $user", {
					user: `user:${id}`,
				})
				.catch(() => []);

			const doc = queryResult[0].result?.[0];

			if (!doc) return null;

			return docToUser(doc);
		},

		async getUserByEmail(email: string) {
			const surreal = await client;

			const users = await surreal
				.query<[UserDoc[]]>("SELECT * FROM user WHERE email = $email", {
					email,
				})
				.catch(() => []);

			const doc = users[0].result?.[0];

			if (!doc) return null;

			return docToUser(doc);
		},

		async getUserByAccount({
			providerAccountId,
			provider,
		}: Pick<AdapterAccount, "provider" | "providerAccountId">) {
			const surreal = await client;

			const users = await surreal
				.query<[AccountDoc<UserDoc>[]]>(
					`SELECT userId
           FROM account
           WHERE providerAccountId = $providerAccountId
           AND provider = $provider
           FETCH userId`,
					{ providerAccountId, provider },
				)
				.catch(() => []);

			const user = users[0].result?.[0]?.userId;

			if (!user) return null;

			return docToUser(user);
		},

		async updateUser(user: Partial<AdapterUser>) {
			const surreal = await client;

			const doc = {
				...user,
				emailVerified: user.emailVerified?.toISOString(),
				id: undefined,
			};

			const updatedUser = await surreal
				.merge<UserDoc, Omit<UserDoc, "id">>(`user:${user.id}`, doc)
				.catch(() => []);

			if (!updatedUser.length) throw new Error("User not updated");

			return docToUser(updatedUser[0]);
		},

		async deleteUser(userId: string) {
			const surreal = await client;

			// delete account
			const accounts = await surreal
				.query<[AccountDoc[]]>(
					`SELECT *
          FROM account
          WHERE userId = $userId
          LIMIT 1`,
					{ userId: `user:${userId}` },
				)
				.catch(() => []);

			const account = accounts[0].result?.[0];

			const deleteAccount = () => {
				if (!account) return;
				const accountId = extractId(account.id);
				return surreal.delete(`account:${accountId}`);
			};

			// delete session
			const sessions = await surreal
				.query<[SessionDoc[]]>(
					`SELECT *
          FROM session
          WHERE userId = $userId
          LIMIT 1`,
					{ userId: `user:${userId}` },
				)
				.catch(() => []);

			const session = sessions[0].result?.[0];

			const deleteSession = () => {
				if (!session) return;
				const sessionId = extractId(session.id);
				return surreal.delete(`session:${sessionId}`);
			};

			const deleteUser = () => surreal.delete(`user:${userId}`);

			await Promise.allSettled([deleteAccount, deleteSession, deleteUser]);
		},

		async linkAccount(account: AdapterAccount) {
			const surreal = await client;

			const doc = await surreal.create("account", accountToDoc(account));

			if (!doc.length) return;

			return docToAccount(doc[0]);
		},

		async unlinkAccount({
			providerAccountId,
			provider,
		}: Pick<AdapterAccount, "provider" | "providerAccountId">) {
			const surreal = await client;

			const accounts = await surreal
				.query<[AccountDoc[]]>(
					`SELECT *
          FROM account
          WHERE providerAccountId = $providerAccountId
            AND provider = $provider
          LIMIT 1`,
					{ providerAccountId, provider },
				)
				.catch(() => []);

			const account = accounts[0].result?.[0];

			if (!account) return;

			const accountId = extractId(account.id);

			await surreal.delete(`account:${accountId}`).catch();
		},

		async createSession({
			sessionToken,
			userId,
			expires,
		}: {
			sessionToken: string;
			userId: string;
			expires: Date;
		}) {
			const surreal = await client;

			const doc = {
				sessionToken,
				userId: `user:${userId}`,
				expires,
			};

			const result = await surreal.create("session", doc).catch(() => []);

			if (!result.length) return null;

			// fix error parsing date
			result[0].expires = new Date(result[0].expires);

			return result[0];
		},

		async getSessionAndUser(sessionToken: string) {
			const surreal = await client;

			// Can't use limit 1 because it prevent userId to be fetched.
			//   Works setting limit to 2
			const sessions = await surreal
				.query<[SessionDoc<UserDoc>[]]>(
					`SELECT *
           FROM session
           WHERE sessionToken = $sessionToken
           FETCH userId`,
					{ sessionToken },
				)
				.catch(() => []);

			const session = sessions[0].result?.[0];

			if (!session) return null;

			const userDoc = session.userId;

			if (!userDoc) return null;

			return {
				user: docToUser(userDoc),
				session: docToSession({
					...session,
					userId: userDoc.id,
				}),
			};
		},

		async updateSession(
			session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">,
		) {
			const surreal = await client;

			const sessions = await surreal
				.query<[SessionDoc[]]>(
					`SELECT *
          FROM session
          WHERE sessionToken = $sessionToken
          LIMIT 1`,
					{ sessionToken: session.sessionToken },
				)
				.catch(() => []);

			const sessionDoc = sessions[0].result?.[0];

			if (!sessionDoc) return;

			if (!session.expires) return;

			const sessionId = extractId(sessionDoc.id);

			const updatedSession = await surreal
				.merge<SessionDoc, Omit<SessionDoc, "id">>(
					`session:${sessionId}`,
					sessionToDoc({
						...sessionDoc,
						...session,
						userId: sessionDoc.userId,
						expires: session.expires,
					}),
				)
				.catch(() => []);

			if (!updatedSession.length) return;

			return docToSession(updatedSession[0]);
		},

		async deleteSession(sessionToken: string) {
			const surreal = await client;

			const sessions = await surreal
				.query<[SessionDoc[]]>(
					`SELECT *
           FROM session
           WHERE sessionToken = $sessionToken
           LIMIT 1`,
					{ sessionToken },
				)
				.catch(() => []);

			const session = sessions[0].result?.[0];

			if (!session) return;

			const sessionId = extractId(session.id);

			await surreal.delete(`session:${sessionId}`).catch();
		},

		async createVerificationToken({
			identifier,
			expires,
			token,
		}: VerificationToken) {
			const surreal = await client;

			const doc = {
				identifier,
				expires,
				token,
			};

			const result = await surreal
				.create("verification_token", doc)
				.catch(() => []);

			if (!result.length) return;

			return result[0];
		},

		async useVerificationToken({
			identifier,
			token,
		}: {
			identifier: string;
			token: string;
		}) {
			const surreal = await client;

			const tokens = await surreal
				.query<
					[{ identifier: string; expires: string; token: string; id: string }[]]
				>(
					`SELECT *
           FROM verification_token
           WHERE identifier = $identifier
             AND token = $verificationToken
           LIMIT 1`,
					{ identifier, verificationToken: token },
				)
				.catch(() => []);

			if (!tokens.length) return null;

			if (!tokens[0].result) return null;

			const vt = tokens[0].result[0];

			if (!vt) return null;

			await surreal.delete(vt.id).catch();

			return {
				identifier: vt.identifier,
				expires: new Date(vt.expires),
				token: vt.token,
			};
		},
	};
}

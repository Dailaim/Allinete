import { $, component$, useSignal } from "@builder.io/qwik";
import wretch from "wretch";
import { useAuthSignin } from "~/routes/plugin@auth";

const authFetch = wretch("http://localhost:3000/").options({
	credentials: "include",
});

const Login = $(async () => {
  await authFetch
    .url("signin")
    .post({
      email: "leo",
      password: "leo",
    })
    .unauthorized(() => {
      return "unauthorized";
    })
    .json((r) => r.message);
})

const Logout = $(async () => {
  await authFetch
    .url("signout")
    .post()
    .unauthorized(() => {
      return "unauthorized";
    })
    .json((r) => r.message);
})

const register = $(async () => {
  await authFetch
    .url("signup")
    .post({
      email: "leo",
      password: "leo",
      name: "leo",
    })
})

export default component$(() => {
	const signIn = useAuthSignin();

	const response = useSignal("");

	return (
		<>
			<div class="h-60">{response.value}</div>
			<form>
				<button
					type="button"
					onClick$={}
				>
					Sign In
				</button>
			</form>

			<button
				type="button"
				onClick$={() => {
					signIn.submit({
						providerId: "github",
						options: {
							callbackUrl: "https://localhost:5173/store",
						},
					});
				}}
			>
				Sign In with Github
			</button>
		</>
	);
});

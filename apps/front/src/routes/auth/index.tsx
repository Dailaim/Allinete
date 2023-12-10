import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import wretch from "wretch";
import { useAuthSignin } from "~/routes/plugin@auth";

const authFetch = wretch("http://localhost:3000/").options({
	credentials: "include",
});

export default component$(() => {
	const signIn = useAuthSignin();

	const response = useSignal("");

	return (
		<>
			<div class="h-60">{response.value}</div>
			<Form action={signIn}>
				<input name="options.email" />
				<input type="text" name="options.name" />
				<input name="options.password" />
				<input name="options.isRegister" value="true" type="hidden" />
				<input type="hidden" name="providerId" value="credentials" />
				<input type="hidden" name="options.callbackUrl" value="/shop/2" />
				<button type="submit">Sign In</button>
			</Form>

			<button
				type="button"
				onClick$={async () => {
					await signIn.submit({
						providerId: "github",
						options: {
							callbackUrl: "/shop/3",
						},
					});
				}}
			>
				Sign In with Github
			</button>
		</>
	);
});

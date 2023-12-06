import { component$, useSignal } from "@builder.io/qwik";
import { Form, server$ } from "@builder.io/qwik-city";
import { useAuthSignin } from "~/routes/plugin@auth";
import wretch from "wretch"


export default component$(() => {
	const signIn = useAuthSignin();

	const response  = useSignal("")

	return (
		<>
		<div class="h-60">
			{response.value}
		</div>
			<button type="button" onClick$={async ()=>{
				response.value = await wretch().options({
					credentials: 'include',
				})
				.url("http://localhost:3000/signin").post({
				email: "leo",
				password: "leo"
				}).unauthorized((error)=>{
					console.log(error)
					return "unauthorized"
				})

				.text()

				console.log(response.value)
			}}>
				Sign In
			</button>
			<Form action={signIn}>
				<input type="hidden" name="providerId" value="github" />
				<input
					type="hidden"
					name="options.callbackUrl"
					value="https://localhost:5173/store"
				/>
				<button type="submit">Sign In</button>
			</Form>
		</>
	);
});

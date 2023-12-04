import { type HtmlHTMLAttributes, component$ } from "@builder.io/qwik";
import { SVGGoogleColor } from "~/components/icons";
import { useAuthSignin } from "~/routes/plugin@auth";
import { ButtonText } from "./button-text";

export interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
	text?: string;
	full?: boolean;
}

export const ButtonGoogle = component$<ButtonProps>(
	({ class: ClassName, full = true, ...props }) => {
		return (
			<ButtonText
				{...props}
				type="button"
				class={[
					"items-center rounded border border-gray bg-white text-blue-gray flex flex-col px-5 py-[0.65rem] border-solid",
					//@ts-ignore
					{ "w-full mx-auto": full },
					//@ts-ignore
					ClassName,
				]}
			>
				<div class="flex max-w-full items-start justify-between gap-5 ">
					<SVGGoogleColor class="aspect-square object-cover object-center w-6 h-6 overflow-hidden shrink-0" />
					<span class="text-gray-500 text-base capitalize self-stretch flex flex-row">
						{props.text ? props.text : "Continue with Google"}
					</span>
				</div>
			</ButtonText>
		);
	},
);

export const ButtonGoogleSignIn = component$<
	ButtonProps & {
		callbackUrl: string;
	}
>(({ callbackUrl, ...props }) => {
	const signIn = useAuthSignin();
	return (
		<ButtonGoogle
			{...props}
			onClick$={() =>
				signIn.submit({
					providerId: "google",
					options: { callbackUrl },
				})
			}
		/>
	);
});

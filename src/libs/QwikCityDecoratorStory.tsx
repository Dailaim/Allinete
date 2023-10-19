import { QwikCityMockProvider } from "@builder.io/qwik-city";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const qwikCityDecoratorStory = (story: () => any) => (
	<QwikCityMockProvider>{story()}</QwikCityMockProvider>
);

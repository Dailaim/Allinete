import { QwikCityMockProvider } from "@builder.io/qwik-city";

export const qwikCityDecoratorStory = (story: () => any) => (
	<QwikCityMockProvider>{story()}</QwikCityMockProvider>
);

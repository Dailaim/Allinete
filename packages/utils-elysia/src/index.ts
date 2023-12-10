import Elysia from "elysia";

export const handlerErrors = new Elysia().onError(({ code, error }) => {
	if (code === "VALIDATION") {
		return error.message;
	}
	return {
		error: error.message,
	};
});

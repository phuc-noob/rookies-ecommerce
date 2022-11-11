export const ResponseError = (err) => {
	console.log("error service", err);
	return err.response.data
		? err.response.data
		: {
				status: 500,
				message: "Server error",
		  };
};

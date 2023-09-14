module.exports = async (time) => {
	return new Promise((resolve) => {
		setTimeout(
			(resolve) => {
				resolve();
			},
			time,
			resolve
		);
	});
};
class config {
	static get() {
		let hostname = window.location.hostname;
		return {
			admin_api: {
				host: `${hostname}/admin/api`,
			},
			app_api: {
				host: `${hostname}/app/api`,
			},
			market_api: {
				host: `${hostname}/market/api`,
			},
			pubsub: {
				host: `${hostname}/pubsub`,
			}
		};
	}
}

export default config;

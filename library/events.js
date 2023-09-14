module.exports = class events {
	static async visit(device_id, user_id) {
		let event = {
			event_id: 'visit',
			device_id: device_id,
			user_id: user_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async multiview(multiview_id, user_id) {
		let event = {
			event_id: 'multiview',
			multiview_id: multiview_id,
			user_id: user_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async smartview(smartview_id, user_id) {
		let event = {
			event_id: 'smartview',
			smartview_id: smartview_id,
			user_id: user_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async simpleview(simpleview_id, user_id) {
		let event = {
			event_id: 'simpleview',
			simpleview_id: simpleview_id,
			user_id: user_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async device_state(device_id) {
		let event = {
			event_id: 'device_state',
			device_id: device_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async smartview_state(device_id) {
		let event = {
			event_id: 'smartview_state',
			device_id: device_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async privacy(device_id, user_id) {
		let event = {
			event_id: 'privacy',
			device_id: device_id,
			user_id: user_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async invite(invite_id) {
		let event = {
			event_id: 'invite',
			invite_id: invite_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async join(link_id) {
		let event = {
			event_id: 'join',
			link_id: link_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async api_enter(enter_id) {
		let event = {
			event_id: 'api_enter',
			enter_id: enter_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async voice_request_nurse(device_id) {
		let event = {
			event_id: 'voice_request_nurse',
			device_id: device_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async voice_privacy(device_id) {
		let event = {
			event_id: 'voice_privacy',
			device_id: device_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async voice_call_family(device_id) {
		let event = {
			event_id: 'voice_call_family',
			device_id: device_id,
			created_at: new Date().getTime(),
		};
		await events.sendEvent(event);
	}

	static async sendEvent() { // (event)
		return;
		// disabled events for now
		// try {
		// 	lib.http({
		// 		method: 'POST',
		// 		uri: `http://integration-api-service:8098/v1/events/send`,
		// 		body: event,
		// 	});
		// } catch (err) {
		// 	console.log(err);
		// }
	}
};

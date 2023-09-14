const lib = require('../library');

module.exports = class meeting {
	static async setup(data) {
		// get existing server
		let meeting_pod = await lib.orm.meetings.fetch(data.meeting_id);
		let needNew = true;
		if (meeting_pod) {
			try {
				let check = await lib.http({
					method: 'GET',
					uri: `http://${meeting_pod.server_ip}:8101/check`,
					timeout: 1000,
				});
				if (check.success) {
					needNew = false;
				}
			} catch (err) {
				needNew = true;
			}
		}

		if (needNew) {
			// pick server
			meeting_pod = await lib.http({
				method: 'GET',
				uri: `http://meeting-api-service:8101/pick`,
			});

			// setup meeting
			await lib.orm.meetings.save({
				org_id: data.org_id,
				meeting_id: data.meeting_id,
				name: data.meeting_name,
				server_ip: meeting_pod.server_ip,
				created_at: new Date().getTime(),
			});
		}

		// setup participant
		let participant_id = lib.util.guid.generate();
		await lib.orm.meetings_participants.save({
			participant_id: participant_id,
			meeting_id: data.meeting_id,
			user_id: data.user_id,
			name: data.name,
			type: data.type,
			code: data.code,
			disable_drop: data.disable_drop,
			usage: data.usage,
			video_quality_out: data.video_quality_out,
			video_rate_out: data.video_rate_out,
			updated_at: new Date().getTime(),
		});

		return participant_id;
	}

	static async kick(participant_id) {
		let participant = await lib.orm.meetings_participants.fetch(participant_id);
		if (participant) {
			let meeting_pod = await lib.orm.meetings.fetch({
				meeting_id: participant.meeting_id,
			});
			if (meeting_pod) {
				await lib.http({
					method: 'POST',
					uri: `http://${meeting_pod.server_ip}:8101/kick`,
					timeout: 1000,
					body: {
						meeting_id: meeting_pod.meeting_id,
						participant_id: participant_id
					},
				});
			}
		}
		return;
	}
};

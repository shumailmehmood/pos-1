var _ = require('lodash'),
	moment = require('moment'),
	lib = require('../library');

module.exports = class devices {
	static getStatus(device) {
		if (!device) {
			return 'unknown';
		}
		if (device.device_type === 'sip') {
			return 'unknown';
		}
		if (!device.heartbeat_at) {
			return 'offline';
		}
		var timeSinceHeartbeat = moment().diff(moment(Number(device.heartbeat_at)), 'seconds');
		if (timeSinceHeartbeat >= 5 * 60) {
			return 'offline';
		} else {
			var online = 'online';
			if (device.diagnostic_camera_state === 'false') {
				online += ' (no camera)';
			}
			if (device.diagnostic_mic_state === 'false') {
				online += ' (no mic)';
			}
			if (device.privacy) {
				online += ' (privacy)';
			}
			return online;
		}
	}

	static async sendCommand(input) {
		await lib.http({
			method: 'POST',
			uri: `http://devices-api-service:8096/v1/commands/send`,
			body: {
				device_id: input.device_id,
				command_id: input.command_id,
				data: input.data,
			},
		});
	}

	static userHasAccess(user_id, device_id) {
		return lib.db
			.fetchOne(
				`
            SELECT EXISTS (
            SELECT ud.device_id FROM users_devices ud WHERE ud.user_id=:user_id AND ud.device_id=:device_id
            UNION
            SELECT gd.device_id FROM users_groups ug INNER JOIN groups_devices gd ON ug.group_id = gd.group_id WHERE ug.user_id=:user_id AND gd.device_id=:device_id
            UNION
            SELECT td.device_id FROM tags_users tu INNER JOIN tags_devices td ON tu.tag_id = td.tag_id WHERE tu.user_id=:user_id AND td.device_id=:device_id
            UNION
            SELECT td.device_id 
            FROM users_groups ug 
            INNER JOIN tags_groups tg ON ug.group_id = tg.group_id 
            INNER JOIN tags_devices td ON tg.tag_id = td.tag_id 
            WHERE ug.user_id=:user_id  AND td.device_id=:device_id) AS hasaccess`,
				{
					user_id: user_id,
					device_id: device_id,
				}
			)
			.then((access) => {
				return access.hasaccess;
			});
	}

	static getDeviceUI(device) {
		var name = device.name;
		var enter_enabled = false;
		var enter_label = '';
		var privacy = false;
		var disable_drop = device.disable_drop;
		var disable_invites = device.disable_invites;
		var activity = false;
		var smartview = device.smartview;
		var smartview_enabled = device.smartview_enabled;
		var voice_commands = device.voice_commands;
		var voice_commands_enabled = device.voice_commands_enabled;
		var inmeeting = false;
		var metric_meeting_participants = [];
		var inmultiview = false;
		var metric_multiview_users = [];
		var message = '';

		if (device.status.indexOf('online') > -1) {
			if (device.status.indexOf('(privacy)') > -1) {
				privacy = true;
				enter_enabled = false;
				enter_label = 'Privacy Enabled';
			} else if (device.status.indexOf('(no camera)') > -1) {
				enter_enabled = false;
				enter_label = 'No Camera';
			} else if (device.status.indexOf('(no mic)') > -1) {
				enter_enabled = false;
				enter_label = 'No Mic';
			} else if (device.status.indexOf('(no speaker)') > -1) {
				enter_enabled = false;
				enter_label = 'No Speaker';
			} else if (device.metric_call_participants >= 5) {
				enter_enabled = false;
				enter_label = 'Room Full';
			} else {
				enter_enabled = true;
				enter_label = 'Enter';
			}
		} else {
			enter_enabled = false;
			enter_label = 'Offline';
		}

		if (device.metric_meeting_state === 'true') {
			inmeeting = true;
			if (device.metric_meeting_participants) {
				metric_meeting_participants = JSON.parse(device.metric_meeting_participants);
			}
		}

		if (device.metric_multiview_state === 'true') {
			inmultiview = true;
			if (device.metric_multiview_users) {
				metric_multiview_users = JSON.parse(device.metric_multiview_users);
			}
		}

		let active = [];
		// get meetig users
		if (device.metric_meeting_state) {
			_.each(metric_meeting_participants, (participant) => {
				active.push({
					what: 'meeting',
					participant_id: participant.participant_id,
					name: participant.name,
					type: participant.type,
					started_on: participant.started_on
				});
			});
		}

		// get multiview users
		if (device.metric_multiview_users) {
			_.each(metric_multiview_users, (user) => {
				active.push({
					what: 'multiview',
					user_id: user.user_id,
					name: user.name,
					started_on: user.started_on
				});
			});
		}

		let messages = [];
		if (inmeeting) {
			messages.push(`${metric_meeting_participants.length || ''} Visitors`);
		}
		if (inmultiview) {
			messages.push(`${metric_multiview_users.length} in MultiView`);
		}
		if (smartview_enabled) {
			messages.push(`SmartView enabled`);
		}
		message = messages.join(', ');

		return {
			device_id: device.device_id,
			token: device.token,
			name,
			type: device.device_type,
			enter_enabled,
			enter_label,
			privacy,
			activity,
			disable_drop,
			smartview,
			smartview_enabled,
			voice_commands,
			voice_commands_enabled,
			disable_invites,
			inmeeting,
			metric_meeting_participants,
			inmultiview,
			metric_multiview_users,
			sip_address: device.sip_address,
			message,
			active
		};
	}
};

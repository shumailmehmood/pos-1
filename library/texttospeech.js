const textToSpeech = require('@google-cloud/text-to-speech'),
	lib = require('./index');

const _client = new textToSpeech.TextToSpeechClient();

module.exports = class {

	static async get(text) {

		let hash = lib.util.hash.sha256(text);
		let t2s = await lib.orm.text_to_speech.fetch(hash);

		if (t2s) {
			return {
				text: t2s.text,
				audio: t2s.audio
			};
		} else {
			let data = await _client.synthesizeSpeech({
				input: {
					text: text
				},
				voice: {
					name: 'en-US-Wavenet-F',
					languageCode: 'en-US',
					ssmlGender: 'FEMALE'
				},
				audioConfig: {
					audioEncoding: 'MP3'
				}
			});
			var response = data[0];
			var audio = response.audioContent.toString('base64');

			await lib.orm.text_to_speech.save({
				hash: hash,
				text: text,
				audio: audio
			});

			return {
				text: text,
				audio: audio
			};
		}
	}
};

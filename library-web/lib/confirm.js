import simpleAlert from 'vue-simple-alert'

class toast {

	static async show(text, title) {
		return simpleAlert.confirm(text, title, 'question').then((confirm) => {
			return confirm;
		}).catch(() => {
			return Promise.resolve(false);
		});
	}
}

export default toast;

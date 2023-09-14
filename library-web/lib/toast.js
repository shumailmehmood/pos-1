import { createToast } from "mosha-vue-toastify";

class toast {

	static show(text) {
		createToast(text, {
			position: 'bottom-center',
			type: 'success',
			transition: 'zoom'
		});
	}

	static showError(text) {
		createToast(text, {
			position: 'bottom-center',
			type: 'danger',
			transition: 'zoom'
		});
	}
}

export default toast;

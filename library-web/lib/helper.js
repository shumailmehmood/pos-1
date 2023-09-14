import moment from 'moment';

class helper {
	static isEmail(email) {
		if (email) {
			const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		} else {
			return false;
		}
	}

	static isPhone(phone, length) {
		if (length >= 10) {
			return /^\d{10,}$/.test(phone.replace(/[\s()+\-.]|ext/gi, ''));
		} else if (phone) {
			return /^\d{7,}$/.test(phone.replace(/[\s()+\-.]|ext/gi, ''));
		} else {
			return false;
		}
	}

	static formatPhoneNumber(str) {
		var cleaned = ('' + str).replace(/\D/g, '');
		var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			var intlCode = match[1] ? '+1 ' : '';
			return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
		}
		return null;
	}

	static parsePhone(number) {
		var cleaned = ('' + number).replace(/\D/g, '');
		var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			var intlCode = match[1] ? '+1' : '';
			return [intlCode, match[2], match[3], match[4]].join('');
		}
		return null;
	}

	static mountComponent(component, id) {
		const div = document.createElement('div');
		if (id) div.id = id;
		document.getElementById('app').appendChild(div);
		component.mount(div);
	}

	static unmountComponent(comp) {
		if (comp) {
			if (comp.$el) {
				if (comp.$el.parentElement) {
					comp.$el.parentElement.remove();
				}
				comp.$el.remove();
				comp.$.appContext.app.unmount();
			}
		}
	}

	static async waitForTruthy(waitFor) {
		if (!waitFor()) {
			return new Promise((resolve) => {
				setTimeout(async () => {
					await this.waitForTruthy(waitFor);
					resolve();
				}, 100);
			});
		} else {
			return Promise.resolve();
		}
	}

	static async waitForFalsy(waitFor) {
		if (waitFor()) {
			return new Promise((resolve) => {
				setTimeout(async () => {
					await this.waitForFalsy(waitFor);
					resolve();
				}, 100);
			});
		} else {
			return Promise.resolve();
		}
	}

	static async waitForElementyWithTimeout(id, timeout, called_on) {
		if (!called_on) called_on = new Date().getTime();
		let elem = document.getElementById(id);
		if (!elem) {
			return new Promise((resolve) => {
				setTimeout(async () => {
					let passed = new Date().getTime() - called_on;
					if (passed > timeout) {
						resolve(false);
					} else {
						resolve(await helper.waitForElementyWithTimeout(id, timeout, called_on));
					}
				}, 100);
			});
		} else {
			return Promise.resolve(true);
		}
	}

	static async delay(time) {
		return new Promise((resolve) => {
			setTimeout(
				(resolve) => {
					resolve();
				},
				time,
				resolve
			);
		});
	}

	static isAlarmActive(alarm_till) {
        var isAlarm = false;
        if (alarm_till) {
            var secsLeft = moment(Number(alarm_till)).diff(moment(), 'seconds');
            if (secsLeft > 0) {
                isAlarm = true;
            }
        }
        return isAlarm;
    }
}

export default helper;

import axios from 'axios';
import lib from '!/library-web/lib';
// import utils from './index';

class api {
	static getHeaders() {
		let token = lib.store.get('token');
		let account_id = lib.store.get('account_id');
		let headers = {
			'Content-Type': 'application/json',
			'Token': token,
		};
		if (account_id) {
			headers['Account'] = account_id;
		}
		return headers;
	}
	static async post(path, data) {
		if (path.indexOf('undefined') > -1) {
			console.log(path);
		}
		let headers = api.getHeaders();
		let result = await axios.post(path, data, {
			headers,
		});
		return result.data;
	}

	static async get(path) {
		if (path.indexOf('undefined') > -1) {
			console.log(path);
		}
		let headers = api.getHeaders();
		let result = await axios.get(path, {
			headers,
		});
		return result.data;
	}

	static configure(router, config) {
		axios.defaults.baseURL = `https://${config.admin_api.host}`;

		axios.interceptors.request.use((config) => {
			lib.progress.start();
			return config;
		});

		axios.interceptors.response.use(
			(response) => {
				lib.progress.stop();
				return response;
			},
			(err) => {
				if (err) {
					const originalRequest = err.config;
					if (err.response.status === 401 && !originalRequest._retry) {
						originalRequest._retry = true;
						return router.push('/login');
					} else {
						console.log(err.response);
						lib.toast.showError('Request failed.');
						return err.response;
					}
				}
			}
		);
	}
}

export default api;

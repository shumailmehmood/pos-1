import axios from 'axios';

class http {
	static async post(path, data) {
		let result = await axios.post(path, data);
		return result.data;
	}

	static async get(path) {
		let result = await axios.get(path);
		return result.data;
	}
}

export default http;

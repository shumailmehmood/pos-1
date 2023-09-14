import NProgress from 'nprogress';

var _progressHandle;

class progress {

	static start() {
		clearInterval(_progressHandle);
		_progressHandle = setTimeout(() => {
			NProgress.start();
		}, 500);
	}

	static stop() {
		clearInterval(_progressHandle);
		NProgress.done();
	}
}

export default progress;

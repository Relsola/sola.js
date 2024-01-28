const config = {
	coverageProvider: 'babel',
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		userAgent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest'
	}
};

module.exports = config;

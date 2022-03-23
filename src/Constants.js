const prod = {
	url: {
		API_URL: 'http://128.199.93.160/api/',
		BASE_URL: 'http://128.199.93.160/',
		IMAGE_URL: 'http://128.199.93.160/uploads/'
	}
};
const dev = {
	url: {
	  	API_URL: 'http://128.199.93.160/api/',
	  	BASE_URL: 'http://128.199.93.160/',
	  	IMAGE_URL: 'http://128.199.93.160/uploads/'
	}
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
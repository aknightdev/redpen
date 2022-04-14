const prod = {
	url: {
		API_URL: 'https://feedback.aaronknightdev.com/api/',
		BASE_URL: 'https://feedback.aaronknightdev.com/',
		IMAGE_URL: 'https://feedback.aaronknightdev.com/uploads/'
	}
};
const dev = {
	url: {
	  	API_URL: 'https://feedback.aaronknightdev.com/api/',
	  	BASE_URL: 'https://feedback.aaronknightdev.com/',
	  	IMAGE_URL: 'https://feedback.aaronknightdev.com/uploads/'
	}
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;
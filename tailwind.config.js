const cool = require("tailwindcss/colors");
module.exports = {
	mode: "jit",
	purge: [
		"./src/**/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false, // or 'media' or 'class'
	images: {
		domains: ["firebasestorage.googleapis.com", "avataaars.io"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	},
	theme: {
		extend: {
			colors: {
				theme: {
					primary: cool.rose,
					accent: "#0f3460",
					blueGray: cool.blueGray,
					third: "#16213e",
					fuchsia: cool.fuchsia,
					text: {
						grayBase: "#616161",
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
};

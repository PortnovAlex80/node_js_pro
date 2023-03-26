import packageJson from './package.json';

const swaggerDefinition = {
	openapi: `3.0.0`,
	info: {
		title: 'Express API',
		version: packageJson.version,
		description: 'An Express API',
	},
	servers: [
		{
			url: 'http://localhost:3000',
			description: 'Local server',
		},
	],
};

export const swaggerOptionsConfig = {
	swaggerDefinition,
	apis: ['./src/**/*.ts'],
};

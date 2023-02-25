import express, { Express } from 'express';
import { Server } from 'http';

export class App {
	server: Server;
	app: Express;
	port: Number;

	constructor() {
		this.app = express();
		this.port = 3000;
	}
	// app.get('/', (req, res) => {
	// 	res.send('Hello World!');
	// });

	// app.listen(port, () => {
	// 	console.log(`Example app listening on port ${port}`);
	// });
}

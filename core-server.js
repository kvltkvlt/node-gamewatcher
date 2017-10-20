'use strict';

import net from 'net';
import os from 'os';
import log from './utils';
import CoreEvents from './events/core-events.js';
import BasicCommandListener from './commands/basic-commands.js';

export class CoreServer {

	constructor(host = 'localhost', port = '3030') {
		this.host = host;
		this.port = port;

		this.clients = new Set();
		this.server = net.createServer(socket => { this.onConnect(socket); });
		this.server.listen(port, host, this.onEnable());
		this.eventListener = new CoreEvents(this);
		
		new BasicCommandListener(this);
	}

	onEnable() {
		log('Север запущен на порту ' + this.port);
	}

	onConnect(socket) {
		socket.setEncoding('UTF-8');
		this.eventListener.registerEvents(socket);
	}

	static send(socket, writeData) {
		socket.write(Buffer.from(writeData, 'utf-8'));
	}

	sendToAll(writeData) {
		this.clients.forEach(client => this.send(client, writeData));
	}

}
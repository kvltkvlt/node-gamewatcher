import log from '../utils';
import CommandListener from './command-listener.js';

export class BasicCommandListener extends CommandListener {

	constructor(server) {
		super();
		this.server = server;
	}

	//Override
	onCommand(command, args) {
		switch (command) {
			case 'who':
			case 'online':
				this.getOnline();
				return true;
		}
		return false;
	}

    getOnline() {
		log('Подключенные серверы:');
		this.server.clients.forEach(client => log(client.remoteAddress + ':' + client.remotePort));
	}

}
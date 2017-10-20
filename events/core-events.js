'use strict';

import log from '../utils';

export class CoreEvents {

	constructor(server) {
		this.server = server;
	}

	registerEvents(socket) {
		socket.on('data', data => {
			this.onData(socket, data);
		});

		socket.on('close', () => {
			this.onDisconnect(socket);
		})

		socket.on('error', () => {
			this.onDisconnect(socket);
		});
	}

	onData(socket, data) {
		let json;
		try {
			json = JSON.parse(data);
		} catch (e) {
			this.onIncorrectPacket(socket);
			return;
		}

		switch (json.name) {
			case 'BukkitConnectionPacket':
				let clientData = json.data;
				let clientName = clientData.clientName;

				log('Присоединился ' + clientName + '/' + socket.remoteAddress);

				this.server.clients.add(socket);
				this.server.send(socket, 'Одобряю, ' + clientName + '\n');

				break;
			default:
				this.onIncorrectPacket(socket);
				break;
		}
	}

	onIncorrectPacket(socket) {
		log('Некорректный пакет от ' + socket.remoteAddress);
		socket.destroy();
	}

	onDisconnect(socket) {
		log("Отключение сервера: " + socket.remoteAddress);
		this.server.clients.delete(socket);
	}

}
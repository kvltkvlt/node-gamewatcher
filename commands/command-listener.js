import log from '../utils';

export class InputListener {

	constructor() {
		let stdin = process.openStdin();
		stdin.addListener('data', str => this._listenCommands(str));
	}

	_listenCommands(command) {
		let cmdArr = command.toString().split(/\s/);
		let cmd = cmdArr[0];
		cmdArr.splice(0, 1);

		if (!this.onCommand(cmd, cmdArr)) {
			log("Команда " + cmd + " не выполнена");
		}
	}

    onCommand(command, args) {
        //Must be overridden
        return false;
    }

}

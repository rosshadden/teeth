const dbus = require('dbus');

const bus = dbus.getBus('system');

const mac = 'AA:AA:AA:AA:AA:AA';

module.exports = class Teeth {
	constructor(service = 'org.bluez') {
		this.service = service;
	}

	getInterface(name) {
		name = `${this.service}.${name}`;

		return new Promise((resolve, reject) => {
			bus.getInterface(this.service, this.toDev(mac), name, (err, iface) => {
				if (err) return reject(err);
				resolve(iface);
			})
		});
	}

	toDev(mac) {
		return `/${this.service.replace(/\./g, '/')}/hci0/dev_${mac.replace(/:/g, '_')}`;
	}
};

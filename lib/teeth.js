const dbus = require('dbus');

const bus = dbus.getBus('system');

module.exports = class Teeth {
	constructor(device, service = 'org.bluez') {
		this.service = service;
		this.device = device;
		this.path = `/${service.replace(/\./g, '/')}/hci0/dev_${device.replace(/:/g, '_')}`;
	}

	getInterface(name) {
		name = `${this.service}.${name}`;

		return new Promise((resolve, reject) => {
			bus.getInterface(this.service, this.path, name, (err, iface) => {
				if (err) return reject(err);
				resolve(iface);
			})
		});
	}
};

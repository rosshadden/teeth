const Teeth = require('./lib/teeth');

const teeth = new Teeth();

(async () => {
	const iface = await teeth.getInterface('Device1');
	console.log(iface);

	process.exit();
})();

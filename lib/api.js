const Koa = require('koa');
const Router = require('koa-router');
const Teeth = require('./teeth');
const body = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');
const session = require('koa-session');
const views = require('koa-views');

function getView(path) {
	if (path === '/') path += 'index';
	return path.slice(1);
}

module.exports = class Api {
	constructor(config = {}) {
		this.config = config;
		this.app = new Koa();
		this.router = new Router();
	}

	init() {
		this.routes();

		this.app.keys = [ 'shhhh you must not tell' ];

		this.app
			.use(session(this.app))
			.use(serve(path.join(__dirname, '..', 'public')))
			.use(views(path.join(__dirname, '..', 'views'), {
				extension: 'pug'
			}))
			.use(this.router.routes())
			.use(this.router.allowedMethods());
	}

	routes() {
		this.router.get('/', (ctx) => {
			return ctx.render(getView(ctx.request.url));
		});

		this.router.get('/:device', (ctx) => {
			Object.assign(ctx.session, ctx.params);
			return ctx.render('device', ctx.params);
		});

		this.router.post('/', body(), async (ctx) => {
			const { device } = ctx.session;
			const teeth = new Teeth(device);
			const body = ctx.request.body;

			const iface = await teeth.getInterface(body.interface);
			iface[body.action]((err, res) => {
				if (err) console.error(err);
				if (res) console.log('res:', res);
			});

			return ctx.body = true;
		});
	}

	start() {
		this.init();
		this.app.listen(3000);
	}

	stop() {}
};

import "./styles/app.css";
import session from "models/session.js";
import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: true,
			start: "/startViews.login"
		};

		super({...defaults, ...config});
		this.use(plugins.User, {
			model: session,
			login: "/startViews.login",
			public: path => path === "/startViews.register"
		});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => new MyApp().render());
}

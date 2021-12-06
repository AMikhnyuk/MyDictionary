import {JetView} from "webix-jet";


export default class MainView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const mainHeader = {
			css: "main_header transparent",
			localId: "mainHeader",
			template: ({src}) => `
					
						<img src="assets/logo.png" class="header_logo">
						<nav>
							<a href="#!/main/mainViews.groups" class="header_link green_text">${_("Мои группы")}</a>
							<a href="#!/main/mainViews.test" class="header_link green_text">${_("Пройти тест")}</a>
							<a href="#!/main/mainViews.results" class="header_link green_text">${_("Мои результаты")}</a>
						</nav>
						<div class="header_user"><img src="${src || "assets/user.jpg"}" class="user_img custom_img"><div>
			`,
			height: 50,
			borderless: true,
			onClick: {
				header_user: (event) => {
					this.popup.show(event.target, {x: -10});
				}
			}
		};
		const ui = {
			rows: [
				{
					cols: [
						mainHeader
					],
					paddingY: 10,
					paddingX: 20

				},
				{
					$subview: true
				}
			]
		};
		return ui;
	}

	init() {
		const _ = this.app.getService("locale")._;
		const header = this.$$("mainHeader");
		this.user = this.app.getService("user").getUser();
		header.setValues({src: this.user.photo});
		this.popup = this.ui({
			view: "popup",
			localId: "user:popup",
			width: 150,
			body: {
				view: "list",
				scroll: false,
				autoheight: true,
				data: [{value: _("Мой профиль"), id: "profile"}, {value: _("Выйти"), id: "logout"}],
				on: {
					onItemClick: (id) => {
						if (id === "profile") {
							this.app.show("main/mainViews.profile");
						}
						else if (id === "logout") {
							const user = this.app.getService("user");
							user.logout();
							this.app.show("startViews.login");
						}
					}
				},
				template: (obj) => {
					if (obj.id === "logout") {
						return `<span class="red">${obj.value}</span>`;
					}
					return obj.value;
				}
			}
		});
		this.on(this.app, "changePhoto", (photo) => {
			header.setValues({src: photo});
		});
	}
}

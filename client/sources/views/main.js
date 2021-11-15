import {JetView} from "webix-jet";


export default class MainView extends JetView {
	config() {
		const mainHeader = {
			css: "main_header transparent",
			template: `
					
						<img src="./sources/styles/assets/logo.png" class="header_logo">
						<nav>
							<a href="#!/main/mainViews.groups/mainViews.groupsViews.words" class="header_link green_text">Мои группы</a>
							<a href="#!/main/mainViews.test" class="header_link green_text">Пройти тест</a>
							<a href="#!/main/mainViews.results" class="header_link green_text">Мои результаты</a>
						</nav>
						<div class="header_user"><img src="./sources/styles/assets/user.jpg" class="user_img"><div>
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
		this.popup = this.ui({
			view: "popup",
			localId: "user:popup",
			width: 150,
			body: {
				view: "list",
				scroll: false,
				select: true,
				autoheight: true,
				data: [{value: "Мой профиль", id: "profile"}, {value: "Выйти", id: "logout"}],
				on: {
					onAfterSelect: (id) => {
						if (id === "profile") {
							this.app.show("main/mainViews.profile");
						}
						else if (id === "logout") {
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
	}
}

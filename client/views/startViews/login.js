import {JetView} from "webix-jet";

export default class LoginView extends JetView {
	config() {
		const loginForm = {
			view: "form",
			css: "start_form",
			localId: "login:form",
			elements: [
				{
					template: "<div class=\"form_header flex-center\"><span class=\"header_text\">Войти в аккаунт</span></div>",
					type: "header",
					borderless: true,
					height: 60,
					css: "custom_input"
				},
				{
					view: "text",
					name: "login",
					placeholder: "Логин",
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					view: "text",
					name: "password",
					placeholder: "Пароль",
					type: "password",
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					rows: [
						{},
						{
							view: "button",
							value: "Войти",
							width: 510,
							height: 75,
							css: "form_enter-btn green_btn",
							click: () => {
								this.doLogin();
							}
						}
					]

				},
				{
					template: "<div class=\"flex-center\"><span class=\"bottom_text\">У вас ещё нет аккаунта? <span class=\"green_text\">Зарегистрироваться</span></span></div>",
					borderless: true,
					onClick: {
						green_text: () => {
							this.app.show("/startViews.register");
						}
					}
				}

			],
			paddingX: 48,
			width: 606,
			height: 480,
			margin: 23,
			elementsConfig: {
				labelPosition: "top"
			}
		};
		const ui = {
			cols: [
				{},
				{
					rows: [
						{
							template: "<div class=\"logo_img\"><img src=\"assets/logo.png\"></div>",
							css: "login_logo flex-center transparent",
							borderless: true
						},
						loginForm,
						{}
					]
				},
				{}
			]

		};
		return ui;
	}

	doLogin() {
		const user = this.app.getService("user");
		const form = this.$$("login:form");
		if (form.validate()) {
			const data = form.getValues();
			user.login(data.login, data.password).catch(() => {
				webix.message("Invalid login or password");
			});
		}
	}
}

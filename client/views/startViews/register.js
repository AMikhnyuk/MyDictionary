import {JetView} from "webix-jet";

export default class RegisterView extends JetView {
	config() {
		const registerForm = {
			view: "form",
			css: "start_form",
			localId: "register:form",
			elements: [
				{
					template: "<div class=\"form_header flex-center\"><span class=\"header_text\">Регистрация</span></div>",
					type: "header",
					borderless: true,
					height: 60
				},
				{
					view: "text",
					name: "login",
					invalidMessage: "This field must be filled",
					placeholder: "Моб.телефон или Email",
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					view: "text",
					name: "name",
					invalidMessage: "This field must be filled",
					placeholder: "Имя и фамилия",
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					view: "text",
					name: "password",
					invalidMessage: "This field must be filled",
					placeholder: "Пароль",
					type: "password",
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					rows: [
						{
							view: "button",
							value: "Зарегистрироваться",
							width: 510,
							height: 75,
							css: "form_enter-btn green_btn",
							click: () => {
								this.doRegister();
							}
						}
					]

				},
				{
					template: "<div class=\"flex-center\"><span class=\"bottom_text\">У вас уже есть аккаунт? <span class=\"green_text\">Вход</span></span></div>",
					borderless: true,
					onClick: {
						green_text: () => {
							this.app.show("/startViews.login");
						}
					}
				}

			],
			paddingX: 48,
			width: 606,
			height: 540,
			margin: 23,
			elementsConfig: {
				labelPosition: "top"
			},
			rules: {
				login: webix.rules.isNotEmpty,
				name: webix.rules.isNotEmpty,
				password: webix.rules.isNotEmpty
			}
		};
		const ui = {
			cols: [
				{},
				{
					rows: [
						{
							template: "<img src=\"assets/logo.png\"><img>",
							css: "login_logo flex-center transparent",
							borderless: true
						},
						registerForm,
						{}
					]
				},
				{}
			]

		};
		return ui;
	}

	doRegister() {
		const form = this.$$("register:form");
		if (form.validate()) {
			const data = form.getValues();
			data.login = data.login.trim();
			webix.ajax().post("/server/register", data)
				.catch((err) => {
					if (err.status === 403) webix.message("Такой пользователь уже существует");
					else webix.message("Неизвестная ошибка, попробуйте снова");
				})
				.then(() => {
					this.app.show("startViews.login");
					webix.message("Регистрация прошла успешно");
				});
		}
	}
}

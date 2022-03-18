import {JetView} from "webix-jet";

import LangSegment from "../additionalViews/langSegment";

export default class RegisterView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const registerForm = {
			view: "form",
			css: "start_form",
			localId: "register:form",
			elements: [
				{
					template: `<div class="form_header flex-center"><span class="header_text">${_("Регистрация")}</span></div>`,
					type: "header",
					borderless: true,
					height: 60
				},
				{
					view: "text",
					name: "login",
					invalidMessage: _("Это поле не должно быть пустым"),
					placeholder: _("Моб.телефон или Email"),
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					view: "text",
					name: "name",
					invalidMessage: _("Это поле не должно быть пустым"),
					placeholder: _("Имя и фамилия"),
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					view: "text",
					name: "password",
					invalidMessage: _("Это поле не должно быть пустым"),
					placeholder: _("Пароль"),
					type: "password",
					width: 510,
					height: 70,
					css: "custom_input"
				},
				{
					rows: [
						{
							view: "button",
							value: _("Зарегистрироваться"),
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
					template: `<div class="flex-center"><span class="bottom_text">${_("У вас уже есть аккаунт?")} <span class="green_text">${_("Вход")}</span></span></div>`,
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
				{
					rows: [
						LangSegment,
						{}
					]
				},
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
		const _ = this.app.getService("locale")._;
		const form = this.$$("register:form");
		if (form.validate()) {
			const data = form.getValues();
			data.login = data.login.trim();
			webix.ajax().post("/server/register", data)
				.catch((err) => {
					if (err.status === 403) webix.message(_("Такой пользователь уже существует"));
					else webix.message(_("Неизвестная ошибка, попробуйте снова"));
				})
				.then(() => {
					this.app.show("startViews.login");
					webix.message(_("Регистрация прошла успешно"));
				});
		}
	}
}

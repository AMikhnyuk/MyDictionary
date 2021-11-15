import {JetView} from "webix-jet";

export default class RegisterView extends JetView {
	config() {
		const registerForm = {
			view: "form",
			css: "start_form",
			elements: [
				{
					template: "<div class=\"form_header flex-center\"><span class=\"header_text\">Регистрация</span></div>",
					type: "header",
					borderless: true,
					height: 60
				},
				{
					view: "text",
					placeholder: "Моб.телефон или Email",
					width: 510,
					height: 70
				},
				{
					view: "text",
					placeholder: "Имя и фамилия",
					width: 510,
					height: 70
				},
				{
					view: "text",
					placeholder: "Пароль",
					type: "password",
					width: 510,
					height: 70
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
								this.app.show("/main/mainViews.groups/mainViews.groupsViews.nogroups");
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
			}
		};
		const ui = {
			cols: [
				{},
				{
					rows: [
						{
							template: "<img src=\"./sources/styles/assets/logo.png\"><img>",
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
}

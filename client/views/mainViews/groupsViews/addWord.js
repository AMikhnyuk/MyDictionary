import {JetView} from "webix-jet";

export default class AddWordWindow extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		return {
			view: "window",
			width: 400,
			height: 500,
			head: "Добавить слово",
			position: "center",
			modal: true,
			close: true,
			body: {
				view: "form",
				localId: "addword:form",
				elements: [
					{view: "text", placeholder: _("Слово"), name: "word", css: "custom_input"},
					{view: "text", placeholder: _("Перевод"), name: "translation", css: "custom_input"},
					{view: "richselect",
						css: "custom_input",
						placeholder: _("Часть речи"),
						options: [
							_("Существительное"), _("Прилагательное"), _("Глагол")
						],
						name: "partofspeech"},
					{view: "button",
						value: _("Добавить"),
						css: "green_btn",
						click: () => {
							const user = this.app.getService("user").getUser();
							webix.ajax().get(`server/groups${user.id}`).then((groups) => {
								const group = groups.json().find(item => item.id === +this.groupId);
								const data = this.$$("addword:form").getValues();
								webix.ajax().post("server/words", {...data, groupId: this.groupId}).then(() => {
									webix.ajax().put(`server/groups${this.groupId}`, {wordsnum: +group.wordsnum + 1}).then(() => {
										this.app.callEvent("wordAdd", [this.groupId, +group.wordsnum + 1]);
										this.app.callEvent("tableFilter");
										this.getRoot().hide();
									});
								});
							});
						}}

				],
				elementsConfig: {
					height: 70
				}

			}
		};
	}

	showWindow(groupId) {
		this.getRoot().show();
		this.groupId = groupId;
	}
}

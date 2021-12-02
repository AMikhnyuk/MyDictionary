import {JetView} from "webix-jet";

import wordsCollection from "../../../models/words";

export default class AddWordWindow extends JetView {
	config() {
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
					{view: "text", placeholder: "Слово", name: "word", css: "custom_input"},
					{view: "text", placeholder: "Перевод", name: "translation", css: "custom_input"},
					{view: "richselect",
						css: "custom_input",
						placeholder: "Часть речи",
						options: [
							"Существительное", "Прилагательное", "Глагол"
						],
						name: "partofspeech"},
					{view: "button",
						value: "Добавить",
						css: "green_btn",
						click: () => {
							const user = this.app.getService("user").getUser();
							webix.ajax().get(`server/groups${user.id}`).then((groups) => {
								const group = groups.json().find(item => item.id === +this.groupId);
								webix.ajax().put(`server/groups${this.groupId}`, {wordsnum: +group.wordsnum + 1}).then(() => {
									const data = this.$$("addword:form").getValues();
									wordsCollection.add({...data, groupId: this.groupId});
									this.app.callEvent("wordAdd", [this.groupId, +group.wordsnum + 1]);
									this.app.callEvent("tableFilter");
									this.getRoot().hide();
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

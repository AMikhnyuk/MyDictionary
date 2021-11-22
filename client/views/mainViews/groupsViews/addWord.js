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
							"Существительное", "Пирлагательное", "Глагол"
						],
						name: "partofspeech"},
					{view: "button",
						value: "Добавить",
						css: "green_btn",
						click: () => {
							const data = this.$$("addword:form").getValues();
							wordsCollection.add(data);
							this.app.callEvent("tableFilter");
							this.getRoot().hide();
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
		this.$$("addword:form").setValues({groupId});
	}
}

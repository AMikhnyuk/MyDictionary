import {JetView} from "webix-jet";

export default class AddWordWindow extends JetView {
	config() {
		return {
			view: "window",
			width: 300,
			height: 500,
			head: "Добвать слово",
			position: "center",
			modal: true,
			close: true,
			body: {
				view: "form",
				elements: [
					{view: "text", label: "Слово"},
					{view: "text", label: "Перевод"},
					{view: "richselect", label: "Часть речи"},
					{view: "button", value: "Добавить", css: "green_btn"}
				],
				elementsConfig: {
					labelPosition: "top"
				}
			}
		};
	}

	showWindow() {
		this.getRoot().show();
	}
}

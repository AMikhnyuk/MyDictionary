import {JetView} from "webix-jet";

import wordsCollection from "../../../models/words";
import AddWordWindow from "./addWord";

export default class WordsView extends JetView {
	config() {
		const wordsTable = {
			view: "datatable",
			css: "custom_table",
			localId: "words:table",
			columns: [
				{id: "word", header: "Слово", fillspace: 2, css: "name_column"},
				{id: "translation", header: "Перевод", css: "name_column", fillspace: 2},
				{id: "partofspeech", header: "Часть речи", css: "align-center_column", adjust: "content"},
				{template: "<i class=\"webix_icon wxi-trash green_text\"></i>", width: 50}

			],
			scrollX: false,
			onClick: {
				green_text: (e, item) => {
					wordsCollection.remove(item.row);
					this.app.callEvent("tableFilter");
				}
			}
		};
		const wordsTableHeader = {
			template: `
				<span class="header_text">Слова в группе</span>
				<i class="webix_icon wxi-plus green_text"></i>
				`,
			css: "table_header flex-center",
			height: 60,
			borderless: true,
			onClick: {
				webix_icon: () => {
					this.win.showWindow(this.groupId);
				}
			}
		};
		const ui = {

			rows: [
				wordsTableHeader,
				wordsTable
			]
		};
		return ui;
	}

	init() {
		this.win = this.ui(AddWordWindow);
		const table = this.$$("words:table");
		table.sync(wordsCollection);
		this.on(this.app, "tableFilter", () => {
			table.filter("#groupId#", this.groupId);
		});
	}

	urlChange() {
		this.groupId = this.getParam("groupId");
		this.app.callEvent("tableFilter");
	}
}

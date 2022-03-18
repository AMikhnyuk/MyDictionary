import {JetView} from "webix-jet";

import AddWordWindow from "./addWord";

export default class WordsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const wordsTable = {
			view: "datatable",
			css: "custom_table",
			localId: "words:table",
			columns: [
				{id: "word", header: _("Слово"), fillspace: 2, css: "name_column"},
				{id: "translation", header: _("Перевод"), css: "name_column", fillspace: 2},
				{id: "partofspeech",
					header: _("Часть речи"),
					css: "align-center_column",
					adjust: "content",
					template: ({partofspeech}) => _(partofspeech)},
				{template: "<i class=\"webix_icon wxi-trash green_text\"></i>", width: 50}

			],
			scrollX: false,
			onClick: {
				green_text: (e, item) => {
					webix.ajax().del(`server/words/${item.row}`, {})
						.then(() => {
							this.table.remove(item.row);
						});
				}
			}
		};
		const wordsTableHeader = {
			template: `
				<span class="header_text">${_("Слова в группе")}</span>
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
		this.groupId = this.getParam("groupId");
		this.win = this.ui(AddWordWindow);
		this.table = this.$$("words:table");
		this.on(this.app, "toExcel", (groupId, name) => {
			webix.toExcel(this.table, {
				hide: obj => obj.groupId !== `${groupId}`,
				filename: name,
				filterHTML: true
			});
		});
		this.on(this.app, "wordAdd", () => {
			this.table.load(`server/words/${this.groupId}`);
		});
	}

	urlChange() {
		this.groupId = this.getParam("groupId");
		this.table.clearAll();
		this.table.load(`server/words/${this.groupId}`);
	}
}

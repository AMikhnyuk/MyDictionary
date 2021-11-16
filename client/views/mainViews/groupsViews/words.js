import {JetView} from "webix-jet";

import AddWordWindow from "./addWord";

export default class WordsView extends JetView {
	config() {
		const wordsTable = {
			view: "datatable",
			css: "custom_table",
			columns: [
				{id: "word", header: "Слово", fillspace: 2, css: "name_column"},
				{id: "translation", header: "Перевод", css: "name_column", fillspace: 2},
				{id: "partofspeech", header: "Часть речи", css: "align-center_column", adjust: "content"},
				{template: "<i class=\"webix_icon wxi-trash green_text\"></i>", width: 50}

			],
			scrollY: false,
			data: [{word: "Hello", translation: "Привет", partofspeech: "Существительное"}, {word: "World", translation: "Мир", partofspeech: "Существительное"}]
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
					this.win.showWindow();
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
	}
}

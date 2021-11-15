import {JetView} from "webix-jet";

export default class GroupsView extends JetView {
	config() {
		const groupsTable = {
			view: "datatable",
			css: "custom_table",
			select: true,
			editable: true,
			columns: [
				{id: "name", header: "Имя", fillspace: true, css: "name_column", editor: "text"},
				{id: "createDate", header: "Дата создания", adjust: "header", css: "align-center_column"},
				{id: "wordnum", header: "Кол. слов", adjust: "header", align: "right", css: "align-center_column"},
				{template: "<i class=\"webix_icon wxi-trash green_text\"></i>", width: 50}
			],
			scroll: false,
			data: [{name: "Hello", createDate: "12.12.2021", wordnum: 3000},
				{name: "World", createDate: "12.11.2011", wordnum: 2000}],
			width: 500
		};
		const groupsTableHeader = {
			template: `
				<span class="header_text">Мои группы</span>
				<i class="webix_icon wxi-plus green_text"></i>
				`,
			css: "table_header flex-center",
			height: 60,
			borderless: true,
			onClick: {
				webix_icon: () => {
					webix.message("Новая группа");
				}
			}
		};
		const ui = {
			cols: [
				{
					rows: [
						groupsTableHeader,
						groupsTable
					],
					padding: 20
				},
				{
					rows: [
						{$subview: true}
					],
					padding: 20
				}
			],
			borderless: true
		};
		return ui;
	}
}

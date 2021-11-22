import {JetView} from "webix-jet";

import groupsCollection from "../../models/groups";
import AddWordWindow from "./groupsViews/addWord";

export default class GroupsView extends JetView {
	config() {
		const groupsTable = {
			view: "datatable",
			css: "custom_table",
			localId: "groups:table",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{id: "name", header: "Имя", fillspace: true, css: "name_column", editor: "text", editaction: "dblclick"},
				{
					id: "createdAt",
					header: "Дата создания",
					adjust: "header",
					css: "align-center_column",
					format: value => webix.Date.dateToStr("%d.%m.%Y")(new Date(value))
				},
				{id: "wordsnum", header: "Кол. слов", adjust: "header", align: "right", css: "align-center_column"},
				{template: "<i class=\"webix_icon wxi-trash green_text\"></i>", width: 50}
			],
			onClick: {
				green_text: (e, item) => {
					webix.ajax().del(`server/groups${item.row}`, {})
						.then(() => {
							groupsCollection.remove(item.row);
							const firstId = this.table.getFirstId();
							if (firstId) this.table.select(firstId);
							else this.app.show("main/mainViews.groups/mainViews.groupsViews.nogroups");
						});
				}
			},
			on: {
				onAfterSelect: (item) => {
					this.app.show(`main/mainViews.groups/mainViews.groupsViews.words?groupId=${item.row}`);
				},
				onAfterEditStop: (obj, item) => {
					webix.ajax().put(`server/groups${item.row}`, {name: obj.value})
						.then(() => {
							groupsCollection.updateItem(item.row, {name: obj.value});
						});
				}
			},
			scrollX: false,
			width: 600
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
				green_text: () => {
					this.$$("add:group").show();
				}
			}
		};
		const addGroups = {
			localId: "add:group",
			view: "form",
			elements: [
				{
					cols: [
						{view: "text", name: "name", css: "custom_input", placeholder: "Название группы"},
						{view: "button",
							value: "Добавить",
							css: "green_btn",
							width: 100,
							click: () => {
								this.createGroup();
							}
						},
						{
							view: "button",
							value: "Отмена",
							css: "green_btn",
							width: 100,
							click: () => {
								const form = this.$$("add:group");
								form.hide();
							}
						}
					]
				}
			],
			hidden: true,
			rules: {
				name: webix.rules.isNotEmpty
			}
		};
		const ui = {
			cols: [
				{
					rows: [
						groupsTableHeader,
						addGroups,
						groupsTable
					]

				},
				{
					rows: [
						{$subview: true}
					]

				}
			],
			paddingX: 20,
			margin: 20,
			borderless: true
		};
		return ui;
	}

	init() {
		this.win = this.ui(AddWordWindow);
		this.table = this.$$("groups:table");
		this.table.sync(groupsCollection);
		this.on(this.app, "createGroup", () => {
			this.app.show("main/mainViews.groups");
			this.$$("add:group").show();
		});
	}

	createGroup() {
		const form = this.$$("add:group");
		const name = form.getValues().name;
		if (form.validate()) {
			const user = this.app.getService("user").getUser();
			webix.ajax().post("server/groups", {userId: user.id, name})
				.then((a) => {
					groupsCollection.add(a.json());
					form.hide();
					this.table.select(this.table.getLastId());
				})
				.catch((err) => {
					if (err.status === 403) webix.message("Такaя группа уже существует");
					else webix.message("Неизвестная ошибка, попробуйте снова");
				});
		}
	}
}

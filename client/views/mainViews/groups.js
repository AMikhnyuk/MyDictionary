import {JetView} from "webix-jet";


export default class GroupsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const groupsTable = {
			view: "datatable",
			css: "custom_table",
			localId: "groups:table",
			select: true,
			editable: true,
			editaction: "dblclick",
			columns: [
				{id: "name", header: _("Имя"), fillspace: true, css: "name_column", editor: "text", editaction: "dblclick"},
				{
					id: "createdAt",
					header: _("Дата создания"),
					adjust: "header",
					css: "align-center_column",
					format: value => webix.Date.dateToStr("%d.%m.%Y")(new Date(value))
				},
				{id: "wordsnum", header: _("Кол. слов"), adjust: "header", align: "right", css: "align-center_column"},
				{template: "<i class=\"webix_icon wxi-download green_text download\"></i>", width: 50},
				{template: "<i class=\"webix_icon wxi-trash green_text delete\"></i>", width: 50}
			],
			onClick: {
				delete: (e, item) => {
					webix.ajax().del(`server/groups${item.row}`, {})
						.then(() => {
							this.table.remove(item.row);
							const firstId = this.table.getFirstId();
							if (firstId) this.table.select(firstId);
							else this.app.show("main/mainViews.groups/mainViews.groupsViews.nogroups");
						});
				},
				download: (e, item) => {
					const name = this.table.getItem(item.row).name;
					this.app.callEvent("toExcel", [item.row, name]);
				}
			},
			on: {
				onAfterSelect: (item) => {
					this.app.show(`main/mainViews.groups/mainViews.groupsViews.words?groupId=${item.row}`);
				},
				onAfterEditStop: (obj, item) => {
					webix.ajax().put(`server/groups${item.row}`, {name: obj.value}).then(() => {
						this.table.updateItem(item.row, {name: obj.value});
					});
				}
			},
			scrollX: false,
			width: 600
		};
		const groupsTableHeader = {
			template: `
				<span class="header_text">${_("Мои группы")}</span>
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
						{view: "text", name: "name", css: "custom_input", placeholder: _("Название группы")},
						{view: "button",
							value: _("Добавить"),
							css: "green_btn",
							width: 100,
							click: () => {
								this.createGroup();
							}
						},
						{
							view: "button",
							value: _("Отмена"),
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
		this.table = this.$$("groups:table");
		this.user = this.app.getService("user").getUser();
		this.table.load(`server/groups${this.user.id}`).then((groups) => {
			this.table.unselectAll();
			if (groups.json()[0]) this.table.select(groups.json()[0].id);
		});
		this.on(this.app, "createGroup", () => {
			this.app.show("main/mainViews.groups");
			this.$$("add:group").show();
		});
		this.on(this.app, "wordAdd", (groupId, wordsnum) => {
			this.$$("groups:table").updateItem(groupId, {wordsnum});
		});
	}

	createGroup() {
		const form = this.$$("add:group");
		const name = form.getValues().name;
		if (form.validate()) {
			const user = this.app.getService("user").getUser();
			webix.ajax().post("server/groups", {userId: user.id, name, wordsnum: 0})
				.then((createdItem) => {
					form.hide();
					this.table.add(createdItem.json());
					this.table.select(this.table.getLastId());
				})
				.catch((err) => {
					if (err.status === 403) webix.message("Такaя группа уже существует");
					else webix.message("Неизвестная ошибка, попробуйте снова");
				});
		}
	}
}

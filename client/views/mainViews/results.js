import {JetView} from "webix-jet";

export default class ResultsView extends JetView {
	config() {
		const resultsTable = {
			view: "datatable",
			css: "custom_table",
			localId: "resultsTable",
			select: true,
			scrollX: false,
			columns: [
				{
					id: "id",
					header: "№",
					width: 50
				},
				{
					id: "groupId",
					css: "name_column",
					header: "Группа",
					fillspace: true,
					options: `server/groups${this.app.getService("user").getUser().id}`,
					template: (obj, common, val, config) => config.collection.getItem(obj.id).name
				},
				{id: "updatedAt",
					header: "Дата прохождения",
					adjust: "header",
					css: "align-center_column",
					template: ({updatedAt}) => webix.Date.dateToStr("%d.%m.%Y")(new Date(updatedAt))},
				{id: "score",
					header: "Результат",
					adjust: "header",
					template: ({score}) => `${score} баллов`},
				{
					id: "status",
					header: "Статус",
					width: 120,
					template: ({status}) => {
						if (status === "in-progress") return "<span style=\"color:orange;\">● В процессе</span>";
						else if (status === "completed") return "<span style=\"color:green;\">● Завершён</span>";
						return status;
					}}
			],
			on: {
				onAfterSelect: (item) => {
					const test = this.$$("resultsTable").getItem(item.row);
					if (test.status === "in-progress") {
						webix.confirm("Продолжить тест?").then(() => {
							this.app.show(`main/mainViews.testViews.runTest?testId=${test.id}?step=${test.currentStep}`);
						});
					}
					const list = this.$$("resultsStepsList");
					list.clearAll();
					list.load(`server/steps/${item.row}`);
					list.show();
				}
			},
			width: 600
		};
		const resultsTableHeader = {
			template: "<span class=\"header_text\">Мои результаты</span>",
			borderless: true,
			height: 60,
			css: "table_header flex-center"
		};
		const resultsStepsList = {
			view: "dataview",
			css: "border-radius",
			localId: "resultsStepsList",
			type: {
				height: 140,
				width: 342
			},
			hidden: true,
			template: ({correct, response, step, secret}) => {
				if (response === "await") return `<span>${step}. ???</span>`;
				return `
					${step}.<br> <span style="color:black;">Вопрос:</span> ${secret}<br>
					 <span style="color:black;">Правильный ответ:</span> ${correct}<br>
					 <span style="color:black;">Ваш ответ:</span> ${response}</span> <i ${correct === response ? "class=\"webix_icon wxi-check\" style=\"color:green;\"" : "class=\"webix_icon wxi-close\" style=\"color:red;\""}></i>
				`;
			}
		};
		const ui = {

			cols: [
				{
					rows: [
						resultsTableHeader,
						resultsTable
					]
				},
				resultsStepsList
			],
			borderless: true,
			margin: 20,
			paddingX: 20

		};
		return ui;
	}

	init() {
		this.user = this.app.getService("user").getUser();
		this.$$("resultsTable").load("server/test");
	}
}

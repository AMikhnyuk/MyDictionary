import {JetView} from "webix-jet";

import wordsCollection from "../../models/words";

export default class TestView extends JetView {
	config() {
		const testHeader = {
			template: `
				<div>
					<div class="test_big header_text">
						Проверьте свои знания прямо сейчас!
					</div>
						
					<div class="test_small flex-center">
						Выберете, какую группу слов вы хотели бы проверить
					</div>
				</div>
			`,
			height: 200,
			width: 724,
			borderless: true
		};
		const testForm = {
			view: "form",
			localId: "test:form",
			elements: [
				{
					cols: [
						{},
						{
							view: "richselect",
							css: "custom_input",
							name: "groupId",
							options: {
								body: {
									url: `server/groups${this.app.getService("user").getUser().id}`,
									template: "#name#"
								}
							},
							height: 55,
							width: 510
						},
						{}
					]
				},
				{
					cols: [
						{},
						{
							view: "button",
							value: "Проверить",
							css: "green_btn",
							height: 60,
							width: 305,
							click: () => {
								this.runTest();
							}

						},
						{}
					]
				}
			],
			rules: {
				groupId: value => wordsCollection.find(item => item.groupId === value).length >= 10 && value
			},
			margin: 20,
			borderless: true
		};
		const ui = {
			cols: [
				{},
				{
					rows: [
						{},
						testHeader,
						testForm,
						{}
					]

				},
				{}
			]
		};
		return ui;
	}

	init() {
		webix.ajax().get("server/inprogress").then((a) => {
			if (a.json().status === "in-progress") {
				webix.confirm("Вы не закончили прохождение прошлого теста. Продолжить?").then(() => {
					this.app.show(`main/mainViews.testViews.runTest?testId=${a.json().id}?step=${a.json().currentStep}`);
				});
			}
		});
	}

	runTest() {
		const form = this.$$("test:form");

		if (form.validate()) {
			const groupId = form.getValues().groupId;
			webix.ajax().post(`server/test/${groupId}`).then((a) => {
				this.app.show(`main/mainViews.testViews.runTest?testId=${a.json().id}?step=1?`);
			});
		}
		else webix.message("Группа должна содержать десять и более слов");
	}
}

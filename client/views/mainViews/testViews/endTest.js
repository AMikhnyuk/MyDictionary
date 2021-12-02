import {JetView} from "webix-jet";

export default class EndTest extends JetView {
	config() {
		const resultsTemplate = {
			css: "flex-center",
			template: ({score}) => `<span class="header_text">Ваш результат: <span style="color:green;">${score}</span> баллов</span>`,
			localId: "endTestScore",
			width: 500
		};
		const ui = {
			cols: [
				{},
				{
					rows: [
						{},
						resultsTemplate,
						{
							view: "button",
							value: "Начать заново",
							css: "green_btn",
							click: () => {
								const testId = this.getParam("testId");
								webix.ajax().get(`server/test/${testId}`).then((a) => {
									const groupId = a.json().groupId;
									webix.ajax().post(`server/test/${groupId}`).then((test) => {
										this.app.show(`main/mainViews.testViews.runTest?testId=${test.json().id}?step=1?`);
									});
								});
							}
						},
						{}
					]
				},
				{}
			]
		};
		return ui;
	}

	urlChange() {
		this.testId = this.getParam("testId");
		webix.ajax().get(`server/test/${this.testId}`).then((a) => {
			this.$$("endTestScore").setValues(a.json());
		});
	}
}

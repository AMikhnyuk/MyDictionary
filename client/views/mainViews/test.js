import {JetView} from "webix-jet";


export default class TestView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const user = this.app.getService("user").getUser();
		const testHeader = {
			template: `
				<div>
					<div class="test_big header_text">
						${_("Проверьте свои знания прямо сейчас!")}
					</div>
						
					<div class="test_small flex-center">
						${_("Выберете, какую группу слов вы хотели бы проверить")}
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
									url: `server/groups${user.id}`,
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
							value: _("Проверить"),
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
		this.user = this.app.getService("user").getUser();
		const _ = this.app.getService("locale")._;
		webix.ajax().get(`server/inprogress/${this.user.id}`).then((a) => {
			if (a.json().status === "in-progress") {
				webix.confirm(_("Вы не закончили прохождение прошлого теста. Продолжить?")).then(() => {
					this.app.show(`main/mainViews.testViews.runTest?testId=${a.json().id}?step=${a.json().currentStep}`);
				});
			}
		});
	}

	runTest() {
		const _ = this.app.getService("locale")._;
		const form = this.$$("test:form");
		const groupId = form.getValues().groupId;
		webix.ajax().get(`server/words/${groupId}`).then((words) => {
			if (words.json().length >= 10) {
				webix.ajax().post(`server/test/${groupId}`, {userId: this.user.id}).then((a) => {
					this.app.show(`main/mainViews.testViews.runTest?testId=${a.json().id}?step=1?`);
				});
			}
			else webix.message(_("Группа должна содержать десять и более слов"));
		});
	}
}

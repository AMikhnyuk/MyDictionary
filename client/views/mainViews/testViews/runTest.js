import {JetView} from "webix-jet";

export default class RunTest extends JetView {
	config() {
		const body = {
			rows: [
				{
					template: () => "...",
					height: 30,
					localId: "stepCount",
					borderless: true
				},
				{
					template: ({secret}) => `
							
							<span style="padding-top:30px;">${secret || "..."}</span>
						`,
					localId: "secret",
					css: "header_text"
				},
				{
					cols: [
						{
							rows: [
								{
									view: "button",
									value: "",
									localId: "word1",
									css: "green_btn",
									click: () => {
										this.check("word1");
									},
									disabled: true
								},

								{
									view: "button",
									value: "",
									localId: "word2",
									css: "green_btn",
									click: () => {
										this.check("word2");
									},
									disabled: true
								}

							]
						},
						{
							rows: [
								{
									view: "button",
									value: "",
									localId: "word3",
									css: "green_btn",
									click: () => {
										this.check("word3");
									},
									disabled: true
								},
								{
									view: "button",
									value: "",
									localId: "word4",
									css: "green_btn",
									click: () => {
										this.check("word4");
									},
									disabled: true
								}
							]
						}
					]
				}
			]
		};
		const ui = {
			cols: [
				{},
				{
					rows: [
						{},
						body,
						{}
					]
				},
				{}
			]
		};
		return ui;
	}

	init() {
		this.word1 = this.$$("word1");
		this.word2 = this.$$("word2");
		this.word3 = this.$$("word3");
		this.word4 = this.$$("word4");
		this.testId = this.getParam("testId");
		webix.ajax().get(`server/test/${this.testId}`).then((a) => {
			this.score = +a.json().score;
		});
	}

	urlChange() {
		this.step = this.getParam("step");
		this.runTest();
	}

	runTest() {
		const roll = [1, 2, 3, 4];
		webix.ajax().get(`server/steps/${this.testId}/${this.step}`).then((a) => {
			this.$$("secret").setValues(a.json());
			this.partofspeech = a.json().partofspeech;
			this.correct = a.json().correct;
			this.stepId = a.json().id;
			roll.sort(() => Math.random() - 0.5);
			this[`word${roll[0]}`].setValue(a.json().word1);
			this[`word${roll[1]}`].setValue(a.json().word2);
			this[`word${roll[2]}`].setValue(a.json().word3);
			this[`word${roll[3]}`].setValue(a.json().word4);
			webix.ajax().get(`server/steps/${this.testId}`).then((steps) => {
				const color = (step) => {
					const currentStep = steps.json()[step];
					if (currentStep.response === "await") return "none";
					return currentStep.response === currentStep.correct ? "green" : "red";
				};
				this.$$("stepCount").setHTML(`
				<div class="step_count">
					<div style="background:${color(0)};"></div>
					<div style="background:${color(1)};"></div>
					<div style="background:${color(2)};"></div>
					<div style="background:${color(3)};"></div>
					<div style="background:${color(4)};"></div>
					<div style="background:${color(5)};"></div>
					<div style="background:${color(6)};"></div>
					<div style="background:${color(7)};"></div>
					<div style="background:${color(8)};"></div>
					<div style="background:${color(9)};"></div>
				</div>`);
				this.word1.enable();
				this.word2.enable();
				this.word3.enable();
				this.word4.enable();
			});
		});
	}

	check(word) {
		this.word1.disable();
		this.word2.disable();
		this.word3.disable();
		this.word4.disable();
		const response = this[word].getValue();
		if (response === this.correct) {
			this.score += this.partofspeech === "Глагол" || this.partofspeech === "Существительное" ? 2 : 1;
		}
		webix.ajax().put(`server/test/${this.testId}`, {score: this.score, currentStep: +this.step + 1}).then(() => {
			webix.ajax().put(`server/steps/${this.stepId}`, {response}).then(() => {
				if (this.step === "10") {
					webix.ajax().put(`server/test/${this.testId}`, {status: "completed"}).then(() => {
						this.app.show(`main/mainViews.testViews.endTest?testId=${this.testId}`);
					});
				}
				else this.app.show(`main/mainViews.testViews.runTest?testId=${this.testId}?step=${+this.step + 1}`);
			});
		});
	}
}

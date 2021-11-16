import {JetView} from "webix-jet";

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
			elements: [
				{
					cols: [
						{},
						{view: "richselect", css: "custom_input", options: ["Hello", "World"], height: 55, width: 510},
						{}
					]
				},
				{
					cols: [
						{},
						{view: "button", value: "Проверить", css: "green_btn", height: 60, width: 305},
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
}

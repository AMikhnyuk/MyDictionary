import {JetView} from "webix-jet";

export default class NogroupsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const nogroupsTemplate = {
			template: `
					<div class="nougroups_header">
						<h1 class="header_text">${_("Создайте свой первый словарь")}<br> ${_("и начните обучение прямо сейчас")}</h1>
					</div>
					<div>
						<i class="webix_icon wxi-plus green_text create_group">${_("Создать группу")}</i>
					</div>`,
			css: "nougroups_template",
			localId: "nogroups:template",
			width: 605,
			height: 528,
			borderless: true,
			onClick: {
				green_text: () => {
					this.app.callEvent("createGroup");
				}
			}
		};
		const ui = {
			rows: [
				{},
				{
					cols: [
						{},
						nogroupsTemplate,
						{}
					]
				},
				{}
			]
		};
		return ui;
	}
}

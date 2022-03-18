import {JetView} from "webix-jet";

export default class LangSegment extends JetView {
	config() {
		const lang = this.app.getService("locale").getLang();
		return {
			view: "segmented",
			css: "customSegment",
			localId: "langSegment",
			type: "icon",
			options: [{id: "en", value: "EN"}, {id: "ru", value: "RU"}],
			click: () => this.toggleLanguage(),
			value: lang
		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("langSegment").getValue();
		langs.setLang(value);
	}
}

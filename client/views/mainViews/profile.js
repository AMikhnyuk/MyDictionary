import {JetView} from "webix-jet";

import LangSegment from "../additionalViews/langSegment";

export default class ProfileView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const photo = {
			localId: "profilePhoto",
			template: ({src, name}) => `
				<div style="height:300px;"><img class="custom_img" src="${src}"></div>
				<div class="flex-center" style="padding-top:20px;"><span class="header_text">${name}</span></div>
			`,
			height: 400,
			borderless: true

		};
		const toolbar = {
			view: "toolbar",
			elements: [
				{view: "uploader",
					css: "green_btn",
					value: _("Загрузить фото"),
					autosend: false,
					accept: "image/jpeg, image/png",
					multiple: false,
					on: {
						onBeforeFileAdd: (upload) => {
							this.uploadFile(upload);
						}
					}
				},
				{
					view: "button",
					css: "webix_danger",
					value: _("Удалить"),
					click: () => {
						webix.confirm("Удалить фото").then(() => {
							webix.ajax().put(`server/user/${this.user.id}`, {photo: ""}).then(() => {
								this.app.getService("user").getUser().photo = "";
								this.$$("profilePhoto").setValues({src: "", name: this.user.name});
								this.app.callEvent("changePhoto", [""]);
							});
						});
					}
				}
			]
		};
		const ui = {
			rows: [
				{},
				{
					cols: [
						{},
						{
							rows: [
								LangSegment,
								photo,
								toolbar
							]
						},
						{}
					]
				},
				{}
			]
		};
		return ui;
	}

	init() {
		webix.ajax().get("server/user/this.user.id");
		this.user = this.app.getService("user").getUser();
		this.$$("profilePhoto").setValues({src: this.user.photo, name: this.user.name});
	}

	uploadFile(upload) {
		const file = upload.file;
		const reader = new FileReader();
		reader.onload = (event) => {
			webix.ajax().put(`server/user/${this.user.id}`, {photo: event.target.result}).then(() => {
				const photo = event.target.result;
				this.app.getService("user").getUser().photo = photo;
				this.$$("profilePhoto").setValues({src: photo, name: this.user.name});
				this.app.callEvent("changePhoto", [photo]);
			});
		};
		reader.readAsDataURL(file);

		return false;
	}
}

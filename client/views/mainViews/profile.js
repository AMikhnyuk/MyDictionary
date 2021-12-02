import {JetView} from "webix-jet";

export default class ProfileView extends JetView {
	config() {
		const photo = {
			localId: "profilePhoto",
			template: ({src, name}) => `
				<img class="custom_img" src="${src}">
				<span class="header_text">${name}</span>
			`,
			borderless: true

		};
		const toolbar = {
			view: "toolbar",
			elements: [
				{view: "uploader",
					css: "green_btn",
					value: "Загрузить фото",
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
					value: "Удалить",
					click: () => {
						webix.confirm("Удалить фото").then(() => {
							webix.ajax().put(`server/user/${this.user.id}`, {photo: ""}).then(() => {
								this.$$("profilePhoto").setValues({src: ""});
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
		this.user = this.app.getService("user").getUser();
		this.$$("profilePhoto").setValues({src: this.user.photo, name: this.user.name});
	}

	uploadFile(upload) {
		const file = upload.file;
		const reader = new FileReader();
		reader.onload = (event) => {
			webix.ajax().put(`server/user/${this.user.id}`, {photo: event.target.result}).then(() => {
				this.$$("profilePhoto").setValues({src: event.target.result});
			});
		};
		reader.readAsDataURL(file);

		return false;
	}
}

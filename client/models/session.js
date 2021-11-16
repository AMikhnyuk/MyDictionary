function status() {
	return webix.ajax().post("/server/server.js")
		.then(a => a.json());
}

function login(user, password) {
	return webix.ajax().post("/server/login", {
		user, password
	}).then(a => a.json());
}

function logout() {
	return webix.ajax().post("/server/logout")
		.then(a => a.json());
}

export default {
	status, login, logout
};

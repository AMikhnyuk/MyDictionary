import en from "./en";

const ru = {};
Object.keys(en).forEach((key) => {
	ru[key] = key;
});
export default ru;

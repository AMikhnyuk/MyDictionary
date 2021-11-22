const wordsCollection = new webix.DataCollection({
	url: "/server/words",
	save: "rest->/server/words"
});
export default wordsCollection;

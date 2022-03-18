const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const session = require("express-session");

const groupsRouter = require("./routers/groups.router");
const stepsRouter = require("./routers/steps.router");
const testRouter = require("./routers/test.router");
const usersRouter = require("./routers/users.router");
const wordsRouter = require("./routers/words.router");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(session({
	secret: "replace this string... k12jh40918e4019u3",
	resave: false,
	saveUninitialized: true,
	cookie: {maxAge: 60 * 60 * 1000}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

app.use("/server", usersRouter);
app.use("/server", groupsRouter);
app.use("/server", wordsRouter);
app.use("/server", testRouter);
app.use("/server", stepsRouter);

app.listen(port, () => {
	console.log(`Hearing at ${port}`);
});

import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from "path";
import api from "./api";
import * as config from "./config";

const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();

app.use(express.static(path.resolve("..", "build")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload(config.fileUpload));
api(router);

app.use("/", router);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});

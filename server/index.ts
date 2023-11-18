import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import { PrismaClient } from "@prisma/client";
import passport from "passport";

import api from "./api";
import { jwtStrategy } from "./api/utils/passport";
import * as config from "./config";

const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const prisma = new PrismaClient({ ...config.prisma });

passport.use(jwtStrategy(prisma));
app.use(express.static(path.resolve("..", "build")));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload(config.fileUpload));
api(prisma, router);

app.use("/", router);

app.listen(port, () => {});

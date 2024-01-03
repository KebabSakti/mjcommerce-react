require("dotenv").config();

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { SocketIo } from "./lib/helper/socket_io";
import userMiddleware from "./view/user/userMiddleware";
import userAuthRoute from "./view/user/route/userAuthRoute";

const app = express();
const server = http.createServer(app);
const io = SocketIo.init(server);
const port = 1001;

//init

//websocket
io.use(async (_, next) => {
  next();
}).on("connection", async (socket) => {
  console.log(socket);
});

//global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//REST
app.use("/user", userMiddleware);
app.use("/user/auth", userAuthRoute);

//route not found 404
app.use("*", (_, res) => res.status(404).json("Route path not found"));

server.listen(port);

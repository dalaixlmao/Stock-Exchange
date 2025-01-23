import ExpressApp from "./servers/api";
import express from "express";
import { Response, Request } from "express";

const app = new ExpressApp();

app.listen(3002);
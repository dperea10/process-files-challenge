import express from "express";
import {healthRoute} from "./healthCheck.route";
import {uploadRoute} from "./uploadFiles.route";
import {authRoute} from "./auth.route";

export const routes = express.Router();

routes.use(healthRoute);
routes.use(authRoute);
routes.use(uploadRoute);





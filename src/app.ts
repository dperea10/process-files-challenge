require('dotenv').config();
import bodyParser from "body-parser";
import express, {Request, Response, NextFunction} from "express";
import cors from "cors";
import {routes} from "./api/routes";
import mongoose from "./config/mongoose";
import initializer from "./utils/initializer";

const app = express();

mongoose.connect();
initializer.init();
const PORT = process.env.PORT || 3002;

app.use(cors());
//Files bigger
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


app.use('/api', routes);

app.use((error: any, req:Request, res:Response, next:NextFunction) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error.',
    },
  });
});


app.listen(PORT, () => console.log(`Ready port ${PORT}`));

export default {app}
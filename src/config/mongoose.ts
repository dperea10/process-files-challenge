import mongoose, {Connection} from "mongoose";
import db from "./default";
// const logger = require("../utils/logger");

const connect = async(): Promise<Connection> => {
  return mongoose.connect(`mongodb://${db.mongodb.address}/${db.mongodb.dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => mongoose.connection);
};

export default {connect};
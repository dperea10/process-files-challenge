import {User} from "../models/user.model";
// const Store = require("../models/uploadFiles.model");
import logger = require("./logger");

// const storeSeed = require("./store.json");

async function createNewUser() {
  const user = new User();
  user.email = "test@test.com";
  user.password = "test";
  await User.create(user);
  logger.logger.info("Test User created");
}

// async function createNewStore() {
//   await Store.create(storeSeed);
//   // logger.info("Test Store created");
// }

const init = async () => {
  if (!await User.countDocuments({ email: "test@test.com" })) {
    await createNewUser();
  }

  // if (await Store.countDocuments() < 1) {
  //   await createNewStore();
  // }
};

export default {init}

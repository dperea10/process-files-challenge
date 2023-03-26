import {User} from "../models/user.model";
import logger = require("./logger");

async function createNewUser() {
  const user = new User();
  user.email = "test@test.com";
  user.password = "test";
  await User.create(user);
  logger.logger.info("Test User created");
}

const init = async () => {
  if (!await User.countDocuments({ email: "test@test.com" })) {
    await createNewUser();
  }
};

export default {init}

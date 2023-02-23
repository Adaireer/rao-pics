import * as dotenv from "dotenv";
import watchImage from "./image";
import watchFloder from "./floder";
import { logger } from "@eagleuse/utils";

export const transformEagle = () => {
  dotenv.config();
  const { LIBRARY } = process.env;
  if (!LIBRARY) throw Error("LIBRARY is null!");

  logger.info("Start transform 🛫");

  watchFloder(LIBRARY);
  watchImage(LIBRARY);
};

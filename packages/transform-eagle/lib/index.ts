import * as dotenv from "dotenv";
import watchImage from "./image";
import watchMetadata from "./metadata";
import { logger } from "@eagleuse/utils";
import { getNSFW } from "./image/nsfw";
import watchStarredTags from "./starred-tags";

export const transformEagle = async () => {
  dotenv.config();
  const { LIBRARY, PLUGIN_NSFW } = process.env;
  if (!LIBRARY) throw Error("LIBRARY is null!");

  if (PLUGIN_NSFW === "true") {
    await getNSFW();
    logger.info("Complete init nsfw.");
  }

  logger.info("Start transform 🛫");

  watchMetadata(LIBRARY);
  watchStarredTags(LIBRARY);
  watchImage(LIBRARY);
};

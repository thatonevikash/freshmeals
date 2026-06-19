import packageJSON from "../package.json";

// -------------------------------------------------------------

export const CONFIG = {
  site: {
    name: "freshmeals",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    version: packageJSON.version,
  },
};

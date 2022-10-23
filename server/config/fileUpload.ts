import { Options } from "express-fileupload";

const config: Options = {
  limits: {
    fileSize: 10485760, // 10MB
  },
  abortOnLimit: true,
};

export default config;

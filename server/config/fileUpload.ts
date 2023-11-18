import { Options } from "express-fileupload";

const config: Options = {
  createParentPath: true,
  limits: {
    fileSize: 10485760 * 100, // 10MB
  },
  useTempFiles: true,
  tempFileDir: "/tmp/",
  abortOnLimit: true,
};

export default config;

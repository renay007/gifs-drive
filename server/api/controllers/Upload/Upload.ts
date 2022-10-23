import type { Router } from "express";
import path from "path";

export default (router: Router) => {
  router.post("/api/upload", async (req, res) => {
    const userId = "972646b0-d56c-409e-9404-783dbcf9c618";
    const dir = path.resolve("..", "private", "uploads");
    const type = "images";
    const fileId = "f2c45025-35f3-4fe8-ac1d-f2ef77f835a3";
    const fileExtension = ".jpg";
    const fileName = `${fileId}${fileExtension}`;
    const friendlyName = `Nevermind${fileExtension}`;
    const uploadPath = `${dir}/${type}/${userId}/${fileName}`;

    // if (!req.files || req.files.length === 0) {

    // }
    console.log("files", req.files);
    console.log("req.body", req.body);
    console.log("__dirname", __dirname);
    console.log("path", dir);
    return res.status(200).send("hello");
  });
};

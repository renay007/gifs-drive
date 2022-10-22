import type { Router } from "express";

export default (router: Router) => {
  router.post("/api/upload", async (req, res) => {
    return res.status(200).send("hello");
  });
};

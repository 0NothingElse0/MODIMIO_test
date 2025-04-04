import { Router } from "express";
import responseServiceBase from "../services/responseServiceBase.js";

const router = Router();

router.all("", function (req, res) {
  responseServiceBase.response404(res, "This page does not exist");
});

export default router;
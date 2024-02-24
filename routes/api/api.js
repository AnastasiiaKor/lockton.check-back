const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { idSchema } = require("../../schemas/id");
const ctrl = require("../../controllers/api");
const router = express.Router();

router.get("/", authenticate, validateBody(idSchema), ctrl.getInfo);

module.exports = router;

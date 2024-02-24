const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { registerSchema } = require("../../models/admin");
const ctrl = require("../../controllers/admins");
const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(registerSchema), ctrl.login);
router.get("/check", authenticate, ctrl.check);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;

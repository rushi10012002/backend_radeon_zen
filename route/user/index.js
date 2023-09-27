const express = require("express");
const { newUserController } = require("../../controller/users");
const router = express.Router();

router.post("/new-user", newUserController)
module.exports = router;

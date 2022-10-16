const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/catalog", require("./catalog.routes"));
router.use("/user", require("./user.routes"));
router.use("/comment", require("./comment.routes"));

module.exports = router;

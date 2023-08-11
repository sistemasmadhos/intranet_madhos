const express = require("express");
const router = express.Router();
const documentsRoute = require("./documents");
const areasRoute = require("./areas");
const HeadRoute = require("./headers");
const anouncesRoute = require("./anounces");
const linksRoute = require("./links");

router.use("/documents",  documentsRoute);
router.use("/areas",  areasRoute);
router.use("/head",  HeadRoute);
router.use("/anounces",  anouncesRoute);
router.use("/links",  linksRoute);

module.exports = router;
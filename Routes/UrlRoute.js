const express = require("express");
const { body } = require("express-validator");

const UrlController = require("../Controllers/UrlController");

const router = express.Router();

router.get("/:val", UrlController.getRoute);
router.post("/addroute",body("val").trim().isURL(), UrlController.createRoute);

module.exports = router;

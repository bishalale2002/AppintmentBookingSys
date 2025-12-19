const express = require("express");
const router = express.Router();
const { businessOwner } = require("../controllers/businessController");
const adminProtect = require("../middleware/adminAuth.js");

router.post("/business/register", adminProtect, businessOwner);


module.exports = router;

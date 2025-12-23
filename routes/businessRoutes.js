const express = require("express");
const router = express.Router();
const { businessOwner } = require("../controllers/businessController");
const adminProtect = require("../middleware/adminAuth.js");

router.post("/register", adminProtect, businessOwner);
router.put(
  "/business/:businessId/schedule",
  adminAuth,
  updateBusinessSchedule
);

router.delete(
  "/business/:businessId",
  adminAuth,
  deleteBusiness
);


module.exports = router;

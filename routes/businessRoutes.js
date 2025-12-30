const express = require("express");
const router = express.Router();
const { businessOwner,deleteBusiness,updateBusinessSchedule } = require("../controllers/businessController");
const adminProtect = require("../middleware/adminAuth.js");

router.post("/register", adminProtect, businessOwner);
router.put(
  "/business/:businessId/schedule",
 adminProtect,
  updateBusinessSchedule
);

router.delete(
  "/business/:businessId",
  adminProtect,
  deleteBusiness
);


module.exports = router;

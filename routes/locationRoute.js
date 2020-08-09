const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");
const authentication = require("../middleware/authenticationHandler");

router.post(
  "/insert",
  authentication.isLoggedIn,
  locationController.createLocation
);
router.post(
  "/update",
  authentication.isLoggedIn,
  locationController.updateLocation
);
router.post("/tag", authentication.isLoggedIn, locationController.tagLocation);
router.post(
  "/location_name",
  authentication.isLoggedIn,
  locationController.nameLocation
);
router.get(
  "/:location_id",
  authentication.isLoggedIn,
  locationController.getLocation
);

module.exports = router;

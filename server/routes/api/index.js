const router = require("express").Router();
const storeRoutes = require("./store-routes");

router.use("/stores", storeRoutes);

module.exports = router;

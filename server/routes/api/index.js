const router = require("express").Router();
const storeRoutes = require("./stores-routes");

router.use("/stores", storeRoutes);

module.exports = router;

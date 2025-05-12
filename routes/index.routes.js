const router = require("express").Router();

const usersRouter = require("./users.routes");
const brandsRouter = require("./brands.routes");
const categoryRouter = require("./category.routes");
const featuresRouter = require("./features.routes");
const laptopsRouter = require("./laptops.routes");
const laptopSpecificationsRouter = require("./laptop_specifications.routes");
const contractsRouter = require("./contracts.routes");
const paymentRouter = require("./payment.routes");
const notifyRouter = require("./notify.routes");
const warrantyRouter = require("./warranty.routes");

router.use("/users", usersRouter);
router.use("/brands", brandsRouter);
router.use("/category", categoryRouter);
router.use("/features", featuresRouter);
router.use("/laptops", laptopsRouter);
router.use("/specification", laptopSpecificationsRouter);
router.use("/contract", contractsRouter);
router.use("/payment", paymentRouter);
router.use("/notify", notifyRouter);
router.use("/warranty", warrantyRouter);

module.exports = router;

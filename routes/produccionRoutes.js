const express = require("express");
const router = express.Router();
const produccionController = require("../controller/produccionController");

router.get("/", produccionController.getProduccion);
router.post("/addProduccion", produccionController.addProduccion);
router.post("/:id", produccionController.updateProduccion);
router.post("/ChangeStatus/:id", produccionController.changeProduccionStatus);
router.delete("/deleteProduccion/:id", produccionController.deleteProduccion)

module.exports = router;
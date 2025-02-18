const express = require("express");
const roomController = require("../controllers/roomControllers");
const uploadMiddleware = require("../middleware/fileUpload");

const router = express.Router();

// INDEX
router.get("/", roomController.index);

// INDEX della tipologia di casa
router.get("/property", roomController.indexProperty);

// RICERCA PER CITTÀ
router.get("/search", roomController.searchByCity);

// SHOW
router.get("/:slug", roomController.show);

// POST
router.post("/", uploadMiddleware, roomController.postAppartemento);

// POST di una recensione
router.post("/:slug/review", roomController.postReview);

// MODIFY
router.patch("/:id", roomController.addLike);

module.exports = router;
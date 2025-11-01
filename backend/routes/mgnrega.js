// const express = require('express');
// const router = express.Router();
// const { getDistrictData } = require('../controllers/mgnregaController');

// router.get('/:district', getDistrictData);

// module.exports = router;
import express from "express";
import { getDistrictData } from "../controllers/mgnregaController.js";

const router = express.Router();

router.get("/:district", getDistrictData);

export default router;

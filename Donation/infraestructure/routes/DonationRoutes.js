"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRouter = void 0;
const express_1 = require("express");
const dependencies_1 = require("../dependencies/dependencies");
const donationRouter = (0, express_1.Router)();
exports.donationRouter = donationRouter;
donationRouter.post('/donar', (req, res) => dependencies_1.donationController.createDonation(req, res));

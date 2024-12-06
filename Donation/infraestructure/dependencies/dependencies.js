"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationController = void 0;
const MercadoPagoClient_1 = require("../../../MercadoPago/infrastructure/adapters/MercadoPagoClient");
const MySQLDonationRepository_1 = require("../api-rest/adapter/MySQLDonationRepository");
const CreateDonationUseCase_1 = require("../../application/CreateDonationUseCase");
const DonationController_1 = require("../api-rest/controller/DonationController");
const mercadoPagoClient = new MercadoPagoClient_1.MercadoPagoClient(); // Crear una instancia de MercadoPagoClient
const donationRepository = new MySQLDonationRepository_1.MySQLDonationRepository();
const createDonationUseCase = new CreateDonationUseCase_1.CreateDonationUseCase(mercadoPagoClient, donationRepository);
exports.donationController = new DonationController_1.DonationController(createDonationUseCase);

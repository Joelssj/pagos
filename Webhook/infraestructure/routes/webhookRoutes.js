"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("../controller/PaymentController");
const ProcessWebhookUseCase_1 = require("../../application/ProcessWebhookUseCase");
const MySQLDonationRepository_1 = require("../../../Donation/infraestructure/api-rest/adapter/MySQLDonationRepository");
const MySQLWebhookRepository_1 = require("../adapter/MySQLWebhookRepository");
const MercadoPagoClient_1 = require("../../../MercadoPago/infrastructure/adapters/MercadoPagoClient");
const router = express_1.default.Router();
// Cambiado a MySQLDonationRepository
const donationRepository = new MySQLDonationRepository_1.MySQLDonationRepository();
const webhookRepository = new MySQLWebhookRepository_1.MySQLWebhookRepository();
const mercadoPagoClient = new MercadoPagoClient_1.MercadoPagoClient();
// Usa `donationRepository` en `ProcessWebhookUseCase`
const processWebhookUseCase = new ProcessWebhookUseCase_1.ProcessWebhookUseCase(donationRepository, webhookRepository, mercadoPagoClient);
const paymentController = new PaymentController_1.PaymentController(processWebhookUseCase);
router.post('/mercadopago', (req, res) => paymentController.handleWebhook(req, res));
exports.default = router;

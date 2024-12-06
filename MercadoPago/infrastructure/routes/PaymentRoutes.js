"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("../controllers/PaymentController");
const CreatePaymentUseCase_1 = require("../../application/CreatePaymentUseCase");
const MySQLPaymentRepository_1 = require("../adapters/MySQLPaymentRepository");
const MercadoPagoClient_1 = require("../adapters/MercadoPagoClient");
const ProcessWebhookUseCase_1 = require("../../application/ProcessWebhookUseCase");
const EmailService_1 = require("../services/EmailService");
// Crear las instancias necesarias para inyectar en el controlador
const paymentRepository = new MySQLPaymentRepository_1.MySQLPaymentRepository();
const mercadoPagoClient = new MercadoPagoClient_1.MercadoPagoClient();
const emailService = new EmailService_1.EmailService();
const createPaymentUseCase = new CreatePaymentUseCase_1.CreatePaymentUseCase(mercadoPagoClient, paymentRepository, emailService);
const processWebhookUseCase = new ProcessWebhookUseCase_1.ProcessWebhookUseCase(paymentRepository, emailService);
// Instanciar el controlador
const paymentController = new PaymentController_1.PaymentController(createPaymentUseCase, paymentRepository, processWebhookUseCase);
const router = express_1.default.Router();
// Ruta para crear un pago
router.post('/create', (req, res) => paymentController.createPayment(req, res));
// Ruta para obtener el estado de un pago
router.get('/status/:id', (req, res) => paymentController.getPaymentStatus(req, res));
// Ruta para el webhook de Mercado Pago
router.post('/webhook/mercadopago', (req, res) => paymentController.handleWebhook(req, res));
exports.default = router;

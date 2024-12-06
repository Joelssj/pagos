"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signale_1 = require("signale");
const express_1 = __importDefault(require("express"));
const PaymentRoutes_1 = __importDefault(require("./MercadoPago/infrastructure/routes/PaymentRoutes"));
const webhookRoutes_1 = __importDefault(require("../../Pagos/src/Webhook/infraestructure/routes/webhookRoutes"));
const DonationRoutes_1 = require("./Donation/infraestructure/routes/DonationRoutes");
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/payment', PaymentRoutes_1.default);
app.use('/api/v1/webhook', webhookRoutes_1.default);
app.use('/api/v1/donation', DonationRoutes_1.donationRouter);
const port = 3002;
const host = '0.0.0.0';
app.listen(port, host, () => {
    signale.success("Server online in port 3010");
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentUseCase = void 0;
const Payment_1 = require("../domain/Payment");
class CreatePaymentUseCase {
    constructor(mercadoPagoClient, paymentRepository, emailService) {
        this.mercadoPagoClient = mercadoPagoClient;
        this.paymentRepository = paymentRepository;
        this.emailService = emailService;
    }
    run(userUuid, correo, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentResponse = yield this.mercadoPagoClient.createPayment(correo, amount);
            const items = [
                {
                    title: "Suscripción",
                    quantity: 1,
                    unit_price: amount
                }
            ];
            const payment = new Payment_1.Payment(paymentResponse.id, items, correo, userUuid, "pending");
            yield this.paymentRepository.savePayment(payment);
            return paymentResponse.init_point;
        });
    }
}
exports.CreatePaymentUseCase = CreatePaymentUseCase;

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
exports.ProcessWebhookUseCase = void 0;
class ProcessWebhookUseCase {
    constructor(paymentRepository, emailService) {
        this.paymentRepository = paymentRepository;
        this.emailService = emailService;
    }
    run(eventType, paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (eventType === "payment") {
                    const payment = yield this.paymentRepository.getPaymentById(paymentId);
                    if (payment && payment.status !== "approved") {
                        yield this.paymentRepository.updatePaymentStatus(paymentId, "approved");
                        yield this.emailService.sendPaymentConfirmationEmail(payment.payerEmail);
                    }
                }
            }
            catch (error) {
                console.error("Error procesando el webhook:", error);
                throw new Error("Error procesando el webhook");
            }
        });
    }
}
exports.ProcessWebhookUseCase = ProcessWebhookUseCase;

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
exports.CreateDonationUseCase = void 0;
class CreateDonationUseCase {
    constructor(mercadoPagoClient, donationRepository) {
        this.mercadoPagoClient = mercadoPagoClient;
        this.donationRepository = donationRepository;
    }
    execute(donorEmail, recipientUserId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Crear la preferencia de pago en MercadoPago usando `createPayment`
            const paymentData = yield this.mercadoPagoClient.createPayment(donorEmail, amount);
            // Guardar la donación en el repositorio con estado "pending"
            const donation = yield this.donationRepository.create({
                donorEmail,
                recipientUserId,
                amount,
                createdAt: new Date(),
                status: 'pending',
                mercadoPagoPreferenceId: paymentData.id
            });
            // Retorna la donación y el enlace para el pago
            return { donation, preferenceUrl: paymentData.init_point };
        });
    }
}
exports.CreateDonationUseCase = CreateDonationUseCase;

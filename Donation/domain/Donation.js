"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
class Donation {
    constructor(id, amount, donorEmail, recipientUserId, createdAt, status, mercadoPagoPreferenceId, mercadoPagoPaymentId // Agregar este campo como opcional
    ) {
        this.id = id;
        this.amount = amount;
        this.donorEmail = donorEmail;
        this.recipientUserId = recipientUserId;
        this.createdAt = createdAt;
        this.status = status;
        this.mercadoPagoPreferenceId = mercadoPagoPreferenceId;
        this.mercadoPagoPaymentId = mercadoPagoPaymentId;
    }
}
exports.Donation = Donation;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
class Payment {
    constructor(id, items, payerEmail, externalReference, status) {
        this.id = id;
        this.items = items;
        this.payerEmail = payerEmail;
        this.externalReference = externalReference;
        this.status = status;
    }
}
exports.Payment = Payment;

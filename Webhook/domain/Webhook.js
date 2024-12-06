"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhook = void 0;
// domain/Webhook.ts
class Webhook {
    constructor(id, type, data, createdAt, updatedAt) {
        this.id = id;
        this.type = type;
        this.data = data;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Webhook = Webhook;

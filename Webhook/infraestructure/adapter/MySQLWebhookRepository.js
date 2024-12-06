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
exports.MySQLWebhookRepository = void 0;
const Webhook_1 = require("../../domain/Webhook");
const mysql_1 = require("../../../database/mysql/mysql");
class MySQLWebhookRepository {
    // Método para guardar un nuevo webhook en la base de datos
    saveWebhook(webhook) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO webhooks (id, type, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
            const params = [
                webhook.id,
                webhook.type,
                JSON.stringify(webhook.data), // Convertir `data` a JSON antes de guardar
                webhook.createdAt,
                webhook.updatedAt,
            ];
            try {
                yield (0, mysql_1.query)(sql, params);
                console.log(`Webhook with id ${webhook.id} saved successfully.`);
            }
            catch (error) {
                console.error(`Error saving webhook with id ${webhook.id}:`, error);
                throw new Error("Error saving webhook to the database.");
            }
        });
    }
    // Método para obtener un webhook por su ID
    getWebhookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM webhooks WHERE id = ?";
            try {
                const [rows] = yield (0, mysql_1.query)(sql, [id]);
                if (rows.length === 0) {
                    throw new Error(`Webhook with id ${id} not found`);
                }
                const webhook = rows[0];
                return new Webhook_1.Webhook(webhook.id, webhook.type, JSON.parse(webhook.data), // Convertir `data` de JSON a objeto al recuperar
                new Date(webhook.created_at), new Date(webhook.updated_at));
            }
            catch (error) {
                console.error(`Error fetching webhook with id ${id}:`, error);
                throw error;
            }
        });
    }
    // Método para obtener todos los webhooks
    getAllWebhooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM webhooks";
            try {
                const [rows] = yield (0, mysql_1.query)(sql, []);
                return rows.map((row) => new Webhook_1.Webhook(row.id, row.type, JSON.parse(row.data), // Convertir `data` de JSON a objeto al recuperar
                new Date(row.created_at), new Date(row.updated_at)));
            }
            catch (error) {
                console.error("Error fetching all webhooks:", error);
                throw new Error("Error fetching all webhooks from the database.");
            }
        });
    }
}
exports.MySQLWebhookRepository = MySQLWebhookRepository;

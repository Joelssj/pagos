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
exports.MySQLPaymentRepository = void 0;
const Payment_1 = require("../../domain/Payment");
const mysql_1 = require("../../../database/mysql/mysql"); // Conexión a la base de datos
class MySQLPaymentRepository {
    // Método para guardar un nuevo pago en la base de datos
    savePayment(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO payments (id, items, payerEmail, externalReference, status) VALUES (?, ?, ?, ?, ?)";
            const params = [
                payment.id,
                JSON.stringify(payment.items), // Convertir items a JSON
                payment.payerEmail,
                payment.externalReference,
                payment.status // Asegúrate de que payment.status tenga un valor válido
            ];
            yield (0, mysql_1.query)(sql, params);
        });
    }
    // Método para obtener un pago por su ID
    getPaymentById(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM payments WHERE id = ?";
            const params = [paymentId];
            const [rows] = yield (0, mysql_1.query)(sql, params);
            if (rows.length === 0) {
                throw new Error(`Payment with id ${paymentId} not found`);
            }
            const payment = rows[0];
            return new Payment_1.Payment(payment.id, JSON.parse(payment.items), // Convertir items de JSON a arreglo
            payment.payerEmail, payment.externalReference, payment.status);
        });
    }
    // Método para actualizar el estado de un pago
    updatePaymentStatus(paymentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE payments SET status = ? WHERE id = ?";
            const params = [status, paymentId];
            yield (0, mysql_1.query)(sql, params);
        });
    }
    // Método para obtener el estado de un pago por su ID
    getPaymentStatus(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM payments WHERE id = ?";
            const params = [paymentId];
            const [rows] = yield (0, mysql_1.query)(sql, params);
            if (rows.length === 0) {
                throw new Error(`Payment with id ${paymentId} not found`);
            }
            const payment = rows[0];
            return new Payment_1.Payment(payment.id, JSON.parse(payment.items), // Convertir items de JSON a arreglo
            payment.payerEmail, payment.externalReference, payment.status);
        });
    }
}
exports.MySQLPaymentRepository = MySQLPaymentRepository;

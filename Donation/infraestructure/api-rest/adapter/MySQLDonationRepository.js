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
exports.MySQLDonationRepository = void 0;
const Donation_1 = require("../../../domain/Donation");
const mysql_1 = require("../../../../database/mysql/mysql");
class MySQLDonationRepository {
    // Método para guardar una nueva donación en la base de datos
    create(donation) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO donations (amount, donorEmail, recipientUserId, createdAt, status, mercadoPagoPreferenceId)
                 VALUES (?, ?, ?, ?, ?, ?)`;
            const params = [
                donation.amount,
                donation.donorEmail,
                donation.recipientUserId,
                donation.createdAt,
                donation.status,
                donation.mercadoPagoPreferenceId
            ];
            // Ejecutar la consulta e insertar la donación
            const result = yield (0, mysql_1.query)(sql, params);
            const donationId = result.insertId;
            // Retornar la donación con el ID asignado
            return new Donation_1.Donation(donationId, donation.amount, donation.donorEmail, donation.recipientUserId, donation.createdAt, donation.status, donation.mercadoPagoPreferenceId);
        });
    }
    // Método para actualizar el estado y el `mercadoPagoPaymentId` de una donación
    updateStatusAndPaymentId(id, status, mercadoPagoPaymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "UPDATE donations SET status = ?, mercadoPagoPaymentId = ? WHERE id = ?";
            const params = [status, mercadoPagoPaymentId, id];
            yield (0, mysql_1.query)(sql, params);
        });
    }
    // Método para buscar una donación por su ID de preferencia de MercadoPago
    findByMercadoPagoId(mercadoPagoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM donations WHERE mercadoPagoPreferenceId = ?";
            const params = [mercadoPagoId];
            const [rows] = yield (0, mysql_1.query)(sql, params);
            if (rows.length === 0) {
                return null;
            }
            const donation = rows[0];
            return new Donation_1.Donation(donation.id, donation.amount, donation.donorEmail, donation.recipientUserId, new Date(donation.createdAt), donation.status, donation.mercadoPagoPreferenceId, donation.mercadoPagoPaymentId);
        });
    }
    // Método para buscar una donación por `mercadoPagoPaymentId` (ID de pago real)
    findByMercadoPagoPaymentId(mercadoPagoPaymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM donations WHERE mercadoPagoPaymentId = ?";
            const params = [mercadoPagoPaymentId];
            const [rows] = yield (0, mysql_1.query)(sql, params);
            if (rows.length === 0) {
                return null;
            }
            const donation = rows[0];
            return new Donation_1.Donation(donation.id, donation.amount, donation.donorEmail, donation.recipientUserId, new Date(donation.createdAt), donation.status, donation.mercadoPagoPreferenceId, donation.mercadoPagoPaymentId // Asegúrate de que Donation tiene este campo
            );
        });
    }
}
exports.MySQLDonationRepository = MySQLDonationRepository;

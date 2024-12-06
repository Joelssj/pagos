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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoPagoClient = void 0;
// @ts-ignore
const mercadopago_1 = __importDefault(require("mercadopago"));
class MercadoPagoClient {
    constructor() {
        mercadopago_1.default.configure({
            access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
        });
    }
    createPayment(email, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Email recibido:", email);
            console.log("Amount recibido:", amount);
            const preference = {
                items: [
                    {
                        title: "Suscripción a Servicio Premium",
                        quantity: 1,
                        currency_id: "MXN",
                        unit_price: amount,
                    }
                ],
                payer: {
                    email: email,
                },
                back_urls: {
                    success: "https://tuapp.com/pago-exitoso",
                    failure: "https://tuapp.com/pago-fallido",
                    pending: "https://tuapp.com/pago-pendiente",
                },
                auto_return: "approved",
            };
            console.log("Preference data:", preference);
            const response = yield mercadopago_1.default.preferences.create(preference);
            console.log("Respuesta de Mercado Pago:", response.body);
            return {
                id: response.body.id,
                init_point: response.body.init_point,
                status: response.body.status,
            };
        });
    }
    // Método ajustado para obtener el estado del pago
    getPaymentStatus(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Solicitando estado para el pago ID:", paymentId);
                const response = yield mercadopago_1.default.payment.get(paymentId);
                console.log("Respuesta de Mercado Pago:", response.body);
                return response.body.status;
            }
            catch (error) {
                console.error("Error al obtener el estado del pago:", {
                    message: error,
                    status: error,
                    cause: error,
                    errorStack: error // Agrega información completa del stack de error
                });
                if (error === 404) {
                    console.error(`El pago con ID ${paymentId} no fue encontrado en Mercado Pago. Verifica si el ID es correcto y pertenece al entorno adecuado.`);
                }
                else {
                    console.error("Error desconocido al obtener el estado del pago.");
                }
                throw new Error("No se pudo obtener el estado del pago.");
            }
        });
    }
}
exports.MercadoPagoClient = MercadoPagoClient;

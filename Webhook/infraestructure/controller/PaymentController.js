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
exports.PaymentController = void 0;
class PaymentController {
    constructor(processWebhookUseCase) {
        this.processWebhookUseCase = processWebhookUseCase;
    }
    handleWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Webhook recibido:", req.body);
            try {
                // Desestructurar `type` y `data` del cuerpo del webhook
                const { type, data } = req.body;
                // Validación inicial del cuerpo del webhook
                if (type !== 'payment' || !data || !data.id) {
                    console.error("El webhook no contiene 'type' válido o falta 'data.id'.");
                    return res.status(400).json({ error: "El cuerpo del webhook es inválido: falta 'data.id' o 'type' no es 'payment'" });
                }
                // Ejecutar el caso de uso para procesar el webhook con el tipo y el ID de pago
                yield this.processWebhookUseCase.run(type, data.id);
                // Confirmación de que el webhook fue procesado exitosamente
                console.log("Webhook procesado exitosamente.");
                return res.status(200).send("Webhook recibido y procesado correctamente");
            }
            catch (error) {
                // Manejo de errores y respuesta con mensaje específico
                console.error("Error en el webhook:", error.message || error);
                return res.status(500).json({ error: "Error al procesar el webhook", details: error.message || error });
            }
        });
    }
}
exports.PaymentController = PaymentController;

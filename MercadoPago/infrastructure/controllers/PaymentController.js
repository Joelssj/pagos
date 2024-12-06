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
    constructor(createPaymentUseCase, paymentRepository, processWebhookUseCase) {
        this.createPaymentUseCase = createPaymentUseCase;
        this.paymentRepository = paymentRepository;
        this.processWebhookUseCase = processWebhookUseCase;
    }
    // Método para crear un pago
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userUuid, correo, amount } = req.body;
                // Verificar que amount esté presente
                if (amount === undefined || amount === null) {
                    return res.status(400).json({ error: "El monto (amount) es necesario para crear el pago." });
                }
                // Iniciar el proceso de pago y generar el link de Mercado Pago
                const paymentLink = yield this.createPaymentUseCase.run(userUuid, correo, amount);
                return res.status(201).json({
                    message: "Pago iniciado con éxito, sigue el link para completar el pago",
                    paymentLink
                });
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
    // Método para obtener el estado del pago
    getPaymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Obtener el estado del pago usando el repositorio directamente
                const paymentStatus = yield this.paymentRepository.getPaymentStatus(id);
                return res.status(200).json(paymentStatus);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
    // Método para manejar el webhook de Mercado Pago
    handleWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, data } = req.body;
                // Verificar que `data` y `data.id` están presentes antes de proceder
                if (!data || !data.id) {
                    return res.status(400).json({ error: "El cuerpo del webhook no contiene la propiedad 'data' o 'id'" });
                }
                // Procesar el evento del webhook usando el caso de uso
                yield this.processWebhookUseCase.run(type, data.id);
                return res.status(200).send("Webhook recibido y procesado correctamente");
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.PaymentController = PaymentController;
// import { Request, Response } from "express";
// import { CreatePaymentUseCase } from "../../application/CreatePaymentUseCase";
// import { PaymentRepository } from "../../domain/PaymentRepository";
// import { ProcessWebhookUseCase } from "../../application/ProcessWebhookUseCase";
// export class PaymentController {
//     private readonly createPaymentUseCase: CreatePaymentUseCase;
//     private readonly paymentRepository: PaymentRepository;
//     private readonly processWebhookUseCase: ProcessWebhookUseCase;
//     constructor(
//         createPaymentUseCase: CreatePaymentUseCase,
//         paymentRepository: PaymentRepository,
//         processWebhookUseCase: ProcessWebhookUseCase
//     ) {
//         this.createPaymentUseCase = createPaymentUseCase;
//         this.paymentRepository = paymentRepository;
//         this.processWebhookUseCase = processWebhookUseCase;
//     }
//     // Método para crear un pago
//     async createPayment(req: Request, res: Response): Promise<Response> {
//         try {
//             const { leadId, email, amount } = req.body;
//             // Verificar que amount esté presente
//             if (amount === undefined || amount === null) {
//                 return res.status(400).json({ error: "El monto (amount) es necesario para crear el pago." });
//             }
//             // Iniciar el proceso de pago y generar el link de Mercado Pago
//             const paymentLink = await this.createPaymentUseCase.run(leadId, email, amount);
//             return res.status(201).json({
//                 message: "Pago iniciado con éxito, sigue el link para completar el pago",
//                 paymentLink
//             });
//         } catch (error: any) {
//             return res.status(400).json({ error: error.message });
//         }
//     }
//     // Método para obtener el estado del pago
//     async getPaymentStatus(req: Request, res: Response): Promise<Response> {
//         try {
//             const { id } = req.params;
//             // Obtener el estado del pago usando el repositorio directamente
//             const paymentStatus = await this.paymentRepository.getPaymentStatus(id);
//             return res.status(200).json(paymentStatus);
//         } catch (error: any) {
//             return res.status(404).json({ error: error.message });
//         }
//     }
//     // Método para manejar el webhook de Mercado Pago
//     async handleWebhook(req: Request, res: Response): Promise<Response> {
//         try {
//             const { type, data } = req.body;
//             // Verificar que `data` y `data.id` están presentes antes de proceder
//             if (!data || !data.id) {
//                 return res.status(400).json({ error: "El cuerpo del webhook no contiene la propiedad 'data' o 'id'" });
//             }
//             // Procesar el evento del webhook usando el caso de uso
//             await this.processWebhookUseCase.run(type, data.id);
//             return res.status(200).send("Webhook recibido y procesado correctamente");
//         } catch (error: any) {
//             return res.status(500).json({ error: error.message });
//         }
//     }
// }

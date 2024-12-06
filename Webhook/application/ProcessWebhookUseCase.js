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
exports.ProcessWebhookUseCase = void 0;
const Webhook_1 = require("../domain/Webhook");
class ProcessWebhookUseCase {
    constructor(donationRepository, // Cambiado a DonationRepository
    webhookRepository, mercadoPagoClient) {
        this.donationRepository = donationRepository;
        this.webhookRepository = webhookRepository;
        this.mercadoPagoClient = mercadoPagoClient;
    }
    run(type, paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (type !== 'payment') {
                    throw new Error(`Tipo de webhook no soportado: ${type}`);
                }
                let donation = yield this.donationRepository.findByMercadoPagoPaymentId(paymentId);
                if (!donation) {
                    console.error(`Donation with MercadoPago payment id ${paymentId} not found. Attempting to find by preference ID.`);
                    donation = yield this.donationRepository.findByMercadoPagoId(paymentId);
                    if (!donation) {
                        console.error(`Donation with MercadoPago preference id ${paymentId} also not found in the system.`);
                        return;
                    }
                    yield this.donationRepository.updateStatusAndPaymentId(donation.id, 'pending', paymentId);
                }
                // Bloque para obtener el estado del pago desde Mercado Pago
                try {
                    const mercadoPagoStatus = yield this.mercadoPagoClient.getPaymentStatus(paymentId);
                    // Mapear el estado de Mercado Pago al estado de tu sistema
                    let paymentStatus;
                    switch (mercadoPagoStatus) {
                        case 'approved':
                            paymentStatus = 'completed';
                            break;
                        case 'in_process':
                        case 'pending':
                            paymentStatus = 'pending';
                            break;
                        default:
                            paymentStatus = 'failed';
                            break;
                    }
                    // Actualizar el estado de la donación en la base de datos
                    yield this.donationRepository.updateStatusAndPaymentId(donation.id, paymentStatus, paymentId);
                }
                catch (mpError) {
                    if (mpError === 404) {
                        console.error(`El pago con ID ${paymentId} no fue encontrado en Mercado Pago.`);
                        // Opcional: Podrías decidir guardar este evento en la base de datos para rastrear pagos no encontrados
                    }
                    else {
                        console.error(`Error desconocido al obtener el estado del pago: ${mpError}`);
                        throw mpError; // Re-lanzar error para manejar en el bloque catch principal
                    }
                }
                // Guardar el webhook en la base de datos
                const webhook = new Webhook_1.Webhook(paymentId, type, { id: paymentId }, new Date(), new Date());
                yield this.webhookRepository.saveWebhook(webhook);
                console.log("Webhook procesado exitosamente.");
            }
            catch (error) {
                console.error(`Error al procesar el webhook: ${error}`);
                throw error;
            }
        });
    }
}
exports.ProcessWebhookUseCase = ProcessWebhookUseCase;
/*import { DonationRepository } from '../../Donation/domain/DonationRepository';
import { MercadoPagoClient } from '../../MercadoPago/infrastructure/adapters/MercadoPagoClient';
import { WebhookRepository } from '../domain/WebhookRepository';
import { Webhook } from '../domain/Webhook';

export class ProcessWebhookUseCase {
    constructor(
        private donationRepository: DonationRepository, // Usa DonationRepository
        private webhookRepository: WebhookRepository,
        private mercadoPagoClient: MercadoPagoClient
    ) {}

    async run(type: string, paymentId: string): Promise<void> {
        try {
            if (type !== 'payment') {
                throw new Error(`Tipo de webhook no soportado: ${type}`);
            }
    
            const donation = await this.donationRepository.findByMercadoPagoId(paymentId);
            if (!donation) {
                console.error(`Donation with MercadoPago id ${paymentId} not found in the system.`);
                return;
            }
    
            const mercadoPagoStatus = await this.mercadoPagoClient.getPaymentStatus(paymentId);
    
            // Mapear el estado de MercadoPago al estado de tu sistema
            let paymentStatus: 'pending' | 'completed' | 'failed';
            switch (mercadoPagoStatus) {
                case 'approved':
                    paymentStatus = 'completed';
                    break;
                case 'in_process':
                case 'pending':
                    paymentStatus = 'pending';
                    break;
                default:
                    paymentStatus = 'failed';
                    break;
            }
    
            await this.donationRepository.updateStatus(donation.id, paymentStatus);
    
            const webhook = new Webhook(
                paymentId,
                type,
                { id: paymentId },
                new Date(),
                new Date()
            );
            await this.webhookRepository.saveWebhook(webhook);
    
        } catch (error) {
            console.error(`Error al procesar el webhook: ${error}`);
            throw error;
        }
    }
    
}
*/
/*
// application/ProcessWebhookUseCase.ts
import { PaymentRepository } from '../../MercadoPago/domain/PaymentRepository';
import { MercadoPagoClient } from '../../MercadoPago/infrastructure/adapters/MercadoPagoClient';
import { WebhookRepository } from '../domain/WebhookRepository';
import { Webhook } from '../domain/Webhook';

export class ProcessWebhookUseCase {
    constructor(
        private paymentRepository: PaymentRepository,
        private webhookRepository: WebhookRepository,
        private mercadoPagoClient: MercadoPagoClient
    ) {}

    async run(type: string, paymentId: string): Promise<void> {
        try {
            if (type !== 'payment') {
                throw new Error(`Tipo de webhook no soportado: ${type}`);
            }

            if (!paymentId) {
                throw new Error(`paymentId no válido: ${paymentId}`);
            }

            const paymentStatus = await this.mercadoPagoClient.getPaymentStatus(paymentId);

            await this.paymentRepository.updatePaymentStatus(paymentId, paymentStatus);

            const webhook = new Webhook(
                paymentId,
                type,
                { id: paymentId },
                new Date(),
                new Date()
            );
            await this.webhookRepository.saveWebhook(webhook);
            
        } catch (error) {
            console.error(`Error al procesar el webhook: ${error}`);
            throw error;
        }
    }
}*/

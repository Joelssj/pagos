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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        // Configurar el transporte con un servicio de correo
        this.transporter = nodemailer_1.default.createTransport({
            service: 'Gmail', // Puedes cambiarlo a otro servicio como Outlook o usar SMTP
            auth: {
                user: process.env.EMAIL_USER, // Correo electrónico del remitente (configúralo en tu .env)
                pass: process.env.EMAIL_PASS // Contraseña del remitente (configúralo en tu .env)
            }
        });
    }
    // Método para enviar un correo de confirmación de pago
    sendPaymentConfirmationEmail(to) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: '"Tu App" <tucorreo@example.com>', // El remitente
                to: to, // El destinatario (correo del cliente)
                subject: 'Confirmación de Pago Exitoso',
                text: 'Tu pago ha sido procesado con éxito. Gracias por tu compra.',
                html: `<p>Tu pago ha sido procesado con éxito. Gracias por tu compra.</p>
                   <p>Por favor, <a href="https://tuapp.com/crear-contrasena">crea tu contraseña</a> para completar la activación de tu cuenta.</p>`
            };
            // Enviar el correo
            yield this.transporter.sendMail(mailOptions);
        });
    }
    // Método para enviar otros tipos de correos (puedes añadir más métodos según lo que necesites)
    sendCustomEmail(to, subject, text, htmlContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: '"Tu App" <tucorreo@example.com>', // El remitente
                to: to, // El destinatario (correo del cliente)
                subject: subject,
                text: text,
                html: htmlContent
            };
            // Enviar el correo
            yield this.transporter.sendMail(mailOptions);
        });
    }
}
exports.EmailService = EmailService;

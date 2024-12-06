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
exports.DonationController = void 0;
class DonationController {
    constructor(createDonationUseCase) {
        this.createDonationUseCase = createDonationUseCase;
    }
    createDonation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { donorEmail, recipientUserId, amount } = req.body;
            try {
                const { donation, preferenceUrl } = yield this.createDonationUseCase.execute(donorEmail, recipientUserId, amount);
                return res.status(201).json({ donation, preferenceUrl });
            }
            catch (error) {
                console.error("Error in createDonation:", error); // Registra el error en la consola para depuración
                return res.status(500).json({ error: error || 'An unknown error occurred' });
            }
        });
    }
}
exports.DonationController = DonationController;

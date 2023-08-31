"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pasargad = void 0;
const axios_1 = require("axios");
const driver_1 = require("../../driver");
const exceptions_1 = require("../../exceptions");
const API = require("./api");
const crypto = require("crypto");
class Pasargad extends driver_1.Driver {
    constructor(config) {
        super(config, API.tConfig);
        this.links = API.links;
        this.requestPayment = async (options) => {
            var _a;
            options = this.getParsedData(options, API.tRequestOptions);
            const { amount, callbackUrl, invoiceDate, invoiceNumber, email, mobile } = options;
            const { merchantId, terminalId } = this.config;
            const data = {
                MerchantCode: merchantId,
                TerminalCode: terminalId,
                Action: 1003,
                Amount: amount,
                InvoiceDate: invoiceDate,
                InvoiceNumber: invoiceNumber,
                RedirectAddress: callbackUrl,
                Timestamp: this.getCurrentTimestamp(),
            };
            const optionalParams = Object.entries({ Email: email, Mobile: mobile });
            for (const param of optionalParams)
                if (param[1])
                    data[param[0]] = param[1];
            const response = await axios_1.default.post(this.getLinks().REQUEST, data, {
                headers: {
                    Sign: await this.signData(this.config.privateKey, data),
                },
            });
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.IsSuccess)) {
                throw new exceptions_1.RequestException(API.errorMessage);
            }
            return this.makeRequestInfo(response.data.Token, 'GET', this.getLinks().PAYMENT, { n: response.data.Token });
        };
        this.verifyPayment = async (_options, params) => {
            var _a;
            const { amount } = _options;
            const { iD, iN, tref } = params;
            const data = {
                Amount: amount,
                InvoiceDate: iD,
                InvoiceNumber: iN,
                Timestamp: this.getCurrentTimestamp(),
                TerminalCode: this.config.terminalId,
                MerchantCode: this.config.merchantId,
            };
            const response = await axios_1.default.post(this.getLinks().VERIFICATION, data, {
                headers: {
                    Sign: await this.signData(this.config.privateKey, data),
                },
            });
            if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.IsSuccess))
                throw new exceptions_1.VerificationException(API.errorMessage);
            return {
                raw: response.data,
                transactionId: tref,
                cardPan: response.data.MaskedCardNumber,
            };
        };
        this.getCurrentTimestamp = () => {
            const currentDateISO = new Date().toISOString();
            return currentDateISO.replace(/-/g, '/').replace('T', ' ').replace('Z', '').split('.')[0];
        };
        this.signData = async (privateKey, data) => {
            const sign = crypto.createSign('SHA1');
            sign.write(JSON.stringify(data));
            sign.end();
            const signedData = sign.sign(Buffer.from(privateKey), 'base64');
            return signedData;
        };
    }
}
exports.Pasargad = Pasargad;
//# sourceMappingURL=index.js.map
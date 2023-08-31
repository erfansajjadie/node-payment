"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payfa = void 0;
const axios_1 = require("axios");
const driver_1 = require("../../driver");
const exceptions_1 = require("../../exceptions");
const API = require("./api");
class Payfa extends driver_1.Driver {
    constructor(config) {
        super(config, API.tConfig);
        this.links = API.links;
        this.requestPayment = async (options) => {
            options = this.getParsedData(options, API.tRequestOptions);
            const { amount, callbackUrl, description, mobileNumber, cardNumber, invoiceId } = options;
            let response;
            try {
                response = await axios_1.default.post(this.getLinks().REQUEST, {
                    amount,
                    callbackUrl,
                    description,
                    mobileNumber,
                    cardNumber,
                    invoiceId,
                }, {
                    headers: this.getHeaders(),
                });
            }
            catch (error) {
                throw new exceptions_1.RequestException(error.response.data.message);
            }
            const { paymentId } = response.data;
            return this.makeRequestInfo(paymentId, 'GET', this.getLinks().PAYMENT + paymentId);
        };
        this.verifyPayment = async (_options, params) => {
            const { paymentId, isSucceed } = params;
            let response;
            try {
                response = await axios_1.default.post(this.getLinks().VERIFICATION + paymentId, {}, { headers: this.getHeaders() });
            }
            catch (error) {
                throw new exceptions_1.VerificationException(error.response.data.message);
            }
            const { transactionId, cardNo } = response.data;
            return {
                raw: response.data,
                transactionId: transactionId,
                cardPan: cardNo,
            };
        };
    }
    getHeaders() {
        return {
            'X-API-Key': this.config.apiKey,
        };
    }
}
exports.Payfa = Payfa;
//# sourceMappingURL=index.js.map
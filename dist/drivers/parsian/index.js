"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parsian = void 0;
const soap = require("soap");
const driver_1 = require("../../driver");
const exceptions_1 = require("../../exceptions");
const API = require("./api");
class Parsian extends driver_1.Driver {
    constructor(config) {
        super(config, API.tConfig);
        this.links = API.links;
        this.requestPayment = async (options) => {
            options = this.getParsedData(options, API.tRequestOptions);
            const { amount, callbackUrl, description } = options;
            const { merchantId } = this.config;
            const client = await soap.createClientAsync(this.getLinks().REQUEST);
            const requestData = {
                Amount: amount,
                CallBackUrl: callbackUrl,
                AdditionalData: description || '',
                LoginAccount: merchantId,
                OrderId: this.generateId(),
            };
            const [response] = await client.SalePaymentRequestAsync({ requestData });
            const { Status, Token, Message } = response.SalePaymentRequestResult;
            if (Status.toString() !== '0' || typeof Token === 'undefined') {
                throw new exceptions_1.RequestException(Message);
            }
            return this.makeRequestInfo(Token, 'GET', this.getLinks().PAYMENT, {
                Token,
            });
        };
        this.verifyPayment = async (_options, params) => {
            const { Token, status } = params;
            const { merchantId } = this.config;
            if (status.toString() !== '0') {
                throw new exceptions_1.PaymentException('تراکنش توسط کاربر لغو شد.');
            }
            const soapClient = await soap.createClientAsync(this.getLinks().VERIFICATION);
            const requestData = {
                LoginAccount: merchantId,
                Token: Number(Token),
            };
            const [verifyResponse] = await soapClient.ConfirmPaymentAsync({ requestData });
            const { CardNumberMasked, RRN, Status } = verifyResponse.ConfirmPaymentResult;
            if (!(Status.toString() === '0' && RRN > 0)) {
                throw new exceptions_1.VerificationException('خطایی در تایید پرداخت به‌وجود آمد');
            }
            return {
                transactionId: RRN,
                cardPan: CardNumberMasked,
                raw: verifyResponse,
            };
        };
    }
    dateFormat(date = new Date()) {
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        return yyyy.toString() + mm.toString() + dd.toString();
    }
    timeFormat(date = new Date()) {
        const hh = date.getHours();
        const mm = date.getMonth();
        const ss = date.getSeconds();
        return hh.toString() + mm.toString() + ss.toString();
    }
}
exports.Parsian = Parsian;
//# sourceMappingURL=index.js.map
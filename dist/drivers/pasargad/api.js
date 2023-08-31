"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tVerifyOptions = exports.tConfig = exports.tRequestOptions = exports.errorMessage = exports.links = void 0;
const t = require("io-ts");
const types_1 = require("../../types");
exports.links = {
    default: {
        REQUEST: 'https://pep.shaparak.ir/Api/v1/Payment/GetToken',
        VERIFICATION: 'https://pep.shaparak.ir/Api/v1/Payment/VerifyPayment',
        PAYMENT: 'https://pep.shaparak.ir/payment.aspx',
    },
};
exports.errorMessage = 'عملیات با خطا مواجه شد';
exports.tRequestOptions = t.intersection([
    t.type({
        invoiceNumber: t.string,
        invoiceDate: t.string,
    }),
    t.partial({
        mobile: t.string,
        email: t.string,
    }),
    types_1.tBaseRequestOptions,
]);
exports.tConfig = t.interface({
    privateKey: t.string,
    merchantId: t.string,
    terminalId: t.string,
});
exports.tVerifyOptions = t.intersection([t.interface({}), types_1.tBaseVerifyOptions]);
//# sourceMappingURL=api.js.map
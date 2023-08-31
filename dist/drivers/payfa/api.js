"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tVerifyOptions = exports.tRequestOptions = exports.tConfig = exports.links = void 0;
const t = require("io-ts");
const types_1 = require("../../types");
exports.links = {
    default: {
        REQUEST: 'https://payment.payfa.com/v2/api/Transaction/Request',
        VERIFICATION: 'https://payment.payfa.com/v2/api/Transaction/Verify/',
        PAYMENT: 'https://payment.payfa.ir/v2/api/Transaction/Pay/',
    },
};
exports.tConfig = t.intersection([
    t.partial({}),
    t.interface({
        apiKey: t.string,
    }),
]);
exports.tRequestOptions = t.intersection([
    t.partial({
        mobileNumber: t.string,
        invoiceId: t.string,
        cardNumber: t.string,
    }),
    types_1.tBaseRequestOptions,
]);
exports.tVerifyOptions = t.intersection([t.partial({}), types_1.tBaseVerifyOptions]);
//# sourceMappingURL=api.js.map
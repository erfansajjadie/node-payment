import { Driver } from '../../driver';
import { LinksObject } from '../../types';
import * as API from './api';
export declare class Pasargad extends Driver<API.Config> {
    constructor(config: API.Config);
    protected links: LinksObject;
    requestPayment: (options: API.RequestOptions) => Promise<import("../../payment-info").PaymentInfo>;
    verifyPayment: (_options: API.VerifyOptions, params: API.CallbackParams) => Promise<API.Receipt>;
    private getCurrentTimestamp;
    private signData;
}

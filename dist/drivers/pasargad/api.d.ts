import * as t from 'io-ts';
import { BaseReceipt, LinksObject } from '../../types';
export declare const links: LinksObject;
export interface RequestPaymentReq {
    InvoiceNumber: string;
    InvoiceDate: string;
    TerminalCode: string;
    MerchantCode: string;
    Amount: number;
    RedirectAddress: string;
    Timestamp: string;
    Action: 1003;
    Mobile?: string;
    Email?: string;
    MerchantName?: string;
    PIDN?: string;
}
export interface RequestPaymentRes {
    IsSuccess: boolean;
    Message: string;
    Token: string;
}
export interface CallbackParams {
    iN: string;
    iD: string;
    tref: string;
}
export interface VerifyPaymentReq {
    InvoiceNumber: string;
    InvoiceDate: string;
    TerminalCode: string;
    MerchantCode: string;
    Amount: number;
    Timestamp: string;
}
export interface VerifyPaymentRes {
    IsSuccess: boolean;
    Message: string;
    MaskedCardNumber: string;
    HashedCardNumber: string;
    ShaparakRefNumber: string;
}
export declare const errorMessage = "\u0639\u0645\u0644\u06CC\u0627\u062A \u0628\u0627 \u062E\u0637\u0627 \u0645\u0648\u0627\u062C\u0647 \u0634\u062F";
export declare const tRequestOptions: t.IntersectionC<[t.TypeC<{
    invoiceNumber: t.StringC;
    invoiceDate: t.StringC;
}>, t.PartialC<{
    mobile: t.StringC;
    email: t.StringC;
}>, t.IntersectionC<[t.TypeC<{
    callbackUrl: t.StringC;
    amount: t.NumberC;
}>, t.PartialC<{
    description: t.StringC;
}>]>]>;
export declare type RequestOptions = t.TypeOf<typeof tRequestOptions>;
export declare const tConfig: t.TypeC<{
    privateKey: t.StringC;
    merchantId: t.StringC;
    terminalId: t.StringC;
}>;
export declare type Config = t.TypeOf<typeof tConfig>;
export declare const tVerifyOptions: t.IntersectionC<[t.TypeC<{}>, t.TypeC<{
    amount: t.NumberC;
}>]>;
export declare type VerifyOptions = t.TypeOf<typeof tVerifyOptions>;
export declare type Receipt = BaseReceipt<VerifyPaymentRes>;

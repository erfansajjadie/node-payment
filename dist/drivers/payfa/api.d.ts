import * as t from 'io-ts';
import { BaseReceipt, LinksObject } from '../../types';
export declare const links: LinksObject;
export interface RequestPaymentReq {
    apiKey: string;
    amount: number;
    callbackUrl: string;
    mobileNumber?: string;
    cardNumber?: string;
    invoiceId?: string;
}
export interface RequestPaymentRes_Success {
    paymentUrl: string;
    approvalUrl: string;
    paymentId: number;
    invoiceId: string | null;
    message: string;
    statusCode: number;
}
export interface RequestPaymentRes_Failed {
    message: string | null;
    errorCode: number;
    statusCode: number;
}
export declare type RequestPaymentRes = RequestPaymentRes_Success | RequestPaymentRes_Failed;
export interface CallbackParams {
    paymentId: number;
    isSucceed: boolean;
}
export interface VerifyPaymentReq {
    apiKey: string;
    paymentId: number;
}
export interface VerifyPaymentRes_Success {
    cardNo: string;
    transactionId: string;
    amount: number;
    invoiceId: string;
    message: string;
    statusCode: number;
}
export interface VerifyPaymentRes_Failed {
    message: string | null;
    errorCode: number;
    statusCode: number;
}
export declare type VerifyPaymentRes = VerifyPaymentRes_Success | VerifyPaymentRes_Failed;
export declare const tConfig: t.IntersectionC<[t.PartialC<{}>, t.TypeC<{
    apiKey: t.StringC;
}>]>;
export declare type Config = t.TypeOf<typeof tConfig>;
export declare const tRequestOptions: t.IntersectionC<[t.PartialC<{
    mobileNumber: t.StringC;
    invoiceId: t.StringC;
    cardNumber: t.StringC;
}>, t.IntersectionC<[t.TypeC<{
    callbackUrl: t.StringC;
    amount: t.NumberC;
}>, t.PartialC<{
    description: t.StringC;
}>]>]>;
export declare type RequestOptions = t.TypeOf<typeof tRequestOptions>;
export declare const tVerifyOptions: t.IntersectionC<[t.PartialC<{}>, t.TypeC<{
    amount: t.NumberC;
}>]>;
export declare type VerifyOptions = t.TypeOf<typeof tVerifyOptions>;
export declare type Receipt = BaseReceipt<VerifyPaymentRes>;

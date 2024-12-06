import {Transaction} from "../../../services/sale";

type TPaymentMethod = "pix" | "creditCard" | "bankBillet"
type TPaymentMethodRenderMessage = "Cartão de Crédito" | "Pix" | "Boleto" | ""
type TPaymentMessageMethodType =  (transaction: Transaction) => string;

interface  IRenderPaymentMethod {
  containsCreditCard: boolean;
  payments: Array<IPayment>
}

interface IPayment {
    type: TPaymentMethodRenderMessage
    message: string;
}

export type { IRenderPaymentMethod, TPaymentMethod, TPaymentMethodRenderMessage,IPayment, TPaymentMessageMethodType }

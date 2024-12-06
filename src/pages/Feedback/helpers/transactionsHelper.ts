import { Transaction} from "../../../services/sale";
import {
  IPayment,
  IRenderPaymentMethod,
  TPaymentMessageMethodType,
  TPaymentMethod,
  TPaymentMethodRenderMessage
} from "../types/transactions.types";
import {transactionsHelper} from "../../../utils/transactionsHelper";
import formatPrice from "../../../utils/format-price";

const _PaymentType: Record<TPaymentMethod, TPaymentMethodRenderMessage> = {
  creditCard: "Cartão de Crédito",
  bankBillet: "Boleto",
  pix: "Pix"
} as const

const _PaymentMessage: Record<TPaymentMethod,TPaymentMessageMethodType> = {
  creditCard: (transaction) => {
    const totalValue = transactionsHelper.getReplaceCentsPrice(transaction.value)
    return `${transaction.installments}x de ${formatPrice(totalValue)}. Código da transação: ${transaction.id}`
  },
  pix: (transaction) => {
    const totalValue = transactionsHelper.getReplaceCentsPrice(transaction.value)
    return `Valor total pago: ${formatPrice(totalValue)}`
  },
  bankBillet: (transaction) => {
    const totalValue = transactionsHelper.getReplaceCentsPrice(transaction.value)
    return `Valor total pago: ${formatPrice(totalValue)}`
  }
}

const getCaseObjectLiterals = <T>(paymentMethod: TPaymentMethod, methodsCase: Record<TPaymentMethod, any>): T => {
  return !methodsCase[paymentMethod] ? "" : methodsCase[paymentMethod];
}

const getPaymentsToRender = (transactions: Array<Transaction>): IRenderPaymentMethod => {
  const paymentsRender: Array<IPayment> = [];
  let containsCreditCard = false;

  transactions.map((transaction: Transaction) => {
    const paymentMethod = transaction.paymentMethod as TPaymentMethod;
    const type = getCaseObjectLiterals<TPaymentMethodRenderMessage>(paymentMethod, _PaymentType);
    const messageMethod = getCaseObjectLiterals<TPaymentMessageMethodType>(paymentMethod, _PaymentMessage);

    if(type === "Cartão de Crédito") {
      containsCreditCard = true;
    }

    return paymentsRender.push({
      type,
      message: messageMethod(transaction)
    })
  })

  return {
    containsCreditCard,
    payments: paymentsRender
  };
}


export { getPaymentsToRender }

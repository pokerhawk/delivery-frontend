import { CreditCardFormSchema } from "../../src/components/PaymentCard/misc";
import { CheckoutSchemaType } from "../../src/shared/schemas/checkout";

export const payUrl = "https://pay-dev.360h.com.br";
export const goUrl = "https://go-dev.360h.com.br";

export const productId = "AF99897808JC";
export const offId = "OF97891196UL";
export const gtmId = "GTM-123456789";
export const pixelId = "845423130433809";

export const validCheckoutFormUserValues: CheckoutSchemaType = {
  userData: {
    name: "name surname",
    document: "16110212008",
    email: "test@email.com",
    phone: "19974154036",
    codeArea: "+55",
  },
  addressData: {
    zipCode: "69912122",
    street: "Rua das Flores",
    number: "1700",
    complement: "Casa",
    neighborhood: "Boa Vista",
    city: "Rio Branco",
    uf: "AC",
  },
};

export const validCheckoutFormPaymentValues: {
  creditCardData: CreditCardFormSchema;
} = {
  creditCardData: {
    cardNumber: "4539003370725497",
    cardHolder: validCheckoutFormUserValues.userData.name,
    cardDocument: validCheckoutFormUserValues.userData.document,
    expiryMonth: "03",
    expiryYear: "2070",
    cvv: "470",
    installments: 1,
  },
};

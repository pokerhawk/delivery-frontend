import * as yup from "yup";
import { UTM } from "../hooks/useProduct";
import api from "./axios";

const baseURL = import.meta.env.VITE_BASE_SALE_URL;

export enum PaymentMethod {
  "creditCard" = "creditCard",
  "bankBillet" = "bankBillet",
  "pix" = "pix",
}

export type SubmitData = {
  sellerId: string;
  shippingPrice: number;
  salePrice: number;
  referenceId: string;
  description: string;
  utm?: UTM;
  customer: {
    name: string;
    phone: string;
    document: string;
    email: string;
    codeArea?: string;
    address: {
      zipCode: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
      uf?: string;
    };
  };
  products: {
    id: string;
    price: number;
  }[];
  //TODO: change to required
  transactions?: {
    paymentMethod: PaymentMethod;
    value: number;
    card?: Card;
    bankBillet?: {
      deadlineDays: number;
      description: string;
    };
    pix?: {
      description: string;
    };
    expirationDate: string;
  }[];
  offerId: string;
  affiliationId: string;
  offerOrderBumpId?: string;
};

type Card = {
  number?: string;
  holder?: string;
  cvv?: string;
  expiresAt?: string;
  hash?: string;
  installments: number;
};

export interface Boleto {
  pdf: string;
  bankLine?: any;
  bankNumber?: any;
  barCode?: any;
  bankEmissor?: any;
  bankAgency?: any;
  bankAccount?: any;
}

export interface Antifraud {
  ip?: any;
  sessionId?: any;
  sent: boolean;
  approved?: any;
}

export interface Pix {
  reference: string;
  qrCode: string;
  image: string;
  page: string;
}

export interface GalaxPayTransaction {
  galaxPayId: number;
  value: number;
  payday: string;
  paydayDate?: any;
  installment: number;
  status: string;
  statusDescription: string;
  createdAt: string;
  datetimeLastSentToOperator?: any;
  chargeGalaxPayId: number;
  chargeMyId: string;
  ConciliationOccurrences: any[];
  Boleto: Boleto;
  Antifraud: Antifraud;
  Pix: Pix;
}

export interface Transaction {
  id: string;
  status: string;
  paymentMethod: string;
  value: number;
  installments: number;
  provider: string;
  providerId: string;
  providerdata?: any;
  saleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  galaxPayTransaction: GalaxPayTransaction;
  pdfBankBillet?: string;
}

export interface Address {
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  city: string;
  country: string;
  complement: string;
}

export interface Customer {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  reference?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  address: Address;
  saleId: string;
}

export type SaleResponse = {
  id: string;
  sellerId: string;
  referenceId: string;
  status: string;
  value: number;
  shippingPrice: number;
  salePrice: number;
  description?: any;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  customer: Customer;
  transactions: Transaction[];
  offer: {
    code: string;
  };
};

export type TGetSaleResponse = SaleResponse & {
  customer: Customer;
  status: EnumStatusSale;
};

export type TGetPaymentOptionResponse = {
  id: string;
  userId: string;
  creditCard: boolean;
  bankBillet: boolean;
  pix: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum EnumStatusSale {
  pending = "pending",
  partiallyPaid = "partiallyPaid",
  paid = "paid",
  canceled = "canceled",
  failed = "failed",
}

type PostSaleParams = {
  data: SubmitData;
  isOwner: boolean;
};

export const postSale = async ({
  data,
}: PostSaleParams): Promise<SaleResponse> => {
  const { data: response } = await api.post<SaleResponse>(
    `${baseURL}/sale`,
    data,
    {
      headers: {
        ...{ Cookies: document.cookie },
        credentials: "include",
      },
      withCredentials: false,
    }
  );

  return response;
};

export const getSaleStatus = async (
  saleId: string
): Promise<TGetSaleResponse> => {
  const { data } = await api.get<TGetSaleResponse>(`${baseURL}/sale/${saleId}`);

  return data;
};

export const getCheckoutPaymentOption = async (
  userId: string
): Promise<TGetPaymentOptionResponse> => {
  const { data } = await api.get<TGetPaymentOptionResponse>(`${baseURL}/cpo${userId}`);

  return data;
};

export const abandonmentSchema = yup.object({
  checkoutUrl: yup.string(),
  name: yup.string(),
  email: yup.string(),
  paymentMethod: yup
    .string()
    .oneOf(["pix", "bankSlip", "creditCard"])
    .nullable(),
  document: yup.string().nullable(),
  phone: yup.string().nullable(),
  zipcode: yup.string().nullable(),
  street: yup.string().nullable(),
  streetNumber: yup.string().nullable(),
  complement: yup.string().nullable(),
  neighborhood: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().max(2).min(2).nullable(),
  affiliationCode: yup.string().nullable(),
  offerCode: yup.string().nullable(),
});

export type Abandonment = yup.InferType<typeof abandonmentSchema>;

export async function postAbandonment(body: Abandonment) {
  try {
    api.post(`${baseURL}/abandonments`, body);
  } catch (e) {
    console.error("[postAbandonment]", e);
  }
}

type ExternalAffiliationData = {
  offerName: string;
  producerId: string;
  affiliatedId: string;
  typeInterestSale: string;
  affiliatedComission: number;
};

type ExternalProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  coverImage: string;
  product_provider: string;
  description: string;
  unitDiscount: number;
  sku: string;
  unitMeasurement: string | null;
  width: number;
  height: number;
  depth: number;
  weight: number;
  type: string;
  disabled: boolean;
  ncm: number;
  cfop: number;
  ean: number;
  offerId: string;
  productId: string;
  sale_id: string;
  created_at: string;
  updated_at: string;
  deletedAt: string | null;
  email_support: string | null;
  phone_support: string | null;
};

export type ExternalOffer = {
  id: string;
  title: string;
  price: number;
  reference: string;
  code: string;
  comission: number;
  typeInterestSale: string;
  sendBy360: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  product_id: string;
  saleId: string;
  chargeShipping: string;
  notExtraCommission: boolean;
  deadlineForReimbursement: number;
  pixDiscount: number;
  shippingType?: "360hub" | "fixed";
  shippingFixedValue?: number;
  paymentBankBillet: boolean;
  product: ExternalProduct;
};

type ExternalOfferOrderBump = {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  price: number;
  textPrice: string;
  textButton: string;
  reference: string;
  referenceOffer: string;
  code: string;
  commission: number;
  sendBy360: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  saleId: string;
  chargeShipping: string;
  product_id: string | null;
  deadlineForReimbursement: number;
  pixDiscount: number;
  paymentBankBillet: boolean;
  typeInterestSale: string;
  notExtraCommission: boolean;
  offerId: string;
  product: ExternalProduct | null;
};

type ExternalUTM = {
  id: string;
  campaign: string;
  source: string;
  medium: string;
  data1: string;
  data2: string;
};

export type ExternalSale = {
  id: string;
  sellerId: string;
  referenceId: string;
  status: string;
  value: number;
  fees: number;
  shippingPrice: number;
  salePrice: number;
  affiliationData: ExternalAffiliationData;
  description: string | null;
  trackingCode: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  uniqueCode: string;
  utmId: string;
  feesOwner: string | null;
  shippingOwner: string;
  saleProvider: string | null;
  urlCheckout: string;
  cartId: string | null;
  withCart: boolean;
  thankYouPage: string | null;
  offer: ExternalOffer;
  offerOrderBump: ExternalOfferOrderBump[];
  commissions: any[];
  utm: ExternalUTM;
};

export async function getSaleById(id: string) {
  return api.get<ExternalSale>(`${baseURL}/sales/${id}`);
}

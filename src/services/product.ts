import api from "./axios";

export type ChargeShipping = "ChargeProducerShipping" | "ChargeCustomerShipping";

export type TypeInterestSale = "InCash" | "ProducerInterest" | "BuyerInterest";

export interface Offer {
  id: string;
  sendBy360?: boolean;
  code: string;
  title: string;
  price: number;
  bannersCheckout: BannerImage[];
  deadlineForReimbursement: number;
  installmentInterest: number;
  pixDiscount: number;
  paymentBankBillet: boolean;
  main: boolean;
  active: boolean;
  comission: number;
  facebookPixel?: string;
  createdAt: Date;
  thankYouPage: string | null;
  updatedAt: Date;
  deletedAt: Date;
  productId: string;
  typeInterestSale: TypeInterestSale;
  chargeShipping: ChargeShipping;
  shipping?: number;
  timerOffer?: TimerOffer;
  support: Support;
  orderBump: OrderBump[];
  scheduledDelivery: boolean;
}

export type Support = {
  emailSupport: string;
  phoneSupport: string;
};

export type TimerOffer = {
  timer: number;
  description?: string;
  title: string;
  status: "active" | "inactive";
};

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  cpf: string;
  documentRG: string;
  birthDate: Date;
  secondaryPhone?: any;
  nacionality: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
}

export interface ProductInfoAffiliated {
  id: string;
  name: string;
  description: string;
}

export interface ProductInfoAffiliated {
  id: string;
  name: string;
  description: string;
}

export type BannerImage = {
  id: string;
  url: string;
  status: "active" | "inactive";
  type: "top" | "column";
};

export interface Product {
  id: string;
  name: string;
  userId: string;
  companyId?: any;
  temporary: boolean;
  provider: string;
  description: string;
  sku: string;
  unitMeasurement: string;
  providerId?: any;
  width: number;
  height: number;
  depth: number;
  weight: number;
  coverImage: string;
  type: string;
  validity: Date;
  factoryName?: any;
  cnpjFactory: string;
  manufacturerRegistrationNumber?: any;
  priceSale: number;
  unitPricePurchase?: any;
  quantityStorage?: any;
  minStorage?: any;
  maxStorage?: any;
  manufacturingTime?: any;
  saleForCompany: boolean;
  disable: boolean;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: any;
  versionedAt?: any;
  user?: User;
  productInfoAffiliated?: ProductInfoAffiliated;
}

export type ADSEventPropsType = {
  name: "AddPaymentInfo" | "PageView" | "Purchase" | "InitiateCheckout";
};

export type ADSPropsType = {
  eventAds: ADSEventPropsType[];
  id: string;
  tag: string;
  typeAds: "facebook" | "google_tag_manager";
};

export type ProductResponse = {
  ads: ADSPropsType[];
  product: Product;
  offer: Offer;
  isOwner: boolean;
};

export type OrderBump = {
  id: string;
  code: string;
  offerId: string;
  title: string;
  description: string;
  priceFrom: number;
  price: number;
  textPrice: string;
  textButton: string;
  sendBy360: boolean;
  quantityProducts: number;
  boxId: string;
  productId: string;
  typeDeliveryPermission: {
    mini: boolean;
    pac: boolean;
    sedex: boolean;
  };
  thankYouPage: string;
  comission: number;
  chargeShipping: ChargeShipping;
};

export const getOffer = async (
  affiliationCode: string,
  offerCode?: string
): Promise<ProductResponse> => {
  const { data } = await api.get<ProductResponse>(
    `/affiliation/checkout/info/${affiliationCode}${
      offerCode ? `?off=${offerCode}` : ""
    }`,
    {
      auth: {
        username: "user",
        password: "123456",
      },
    }
  );

  return data;
};

export type CalculatedPriceOrderPayload = {
  destinationUF: string;
  destinationCity: string;
  productId: string;
};

export interface AllPrice {
  price: number;
  priceCost: number;
  deliveryOption: string;
}

export interface LowPrice {
  price: number;
  priceCost: number;
  deliveryOption: string;
}

export interface LowPriceCost {
  price: number;
  priceCost: number;
  deliveryOption: string;
}

export interface CalculatedPriceOrder {
  allPrices: AllPrice[];
  lowPrice: LowPrice;
  lowPriceCost: LowPriceCost;
}

export const calculatedPriceOrderMock: CalculatedPriceOrder = {
  allPrices: [
    {
      price: 19.32,
      priceCost: 16.79,
      deliveryOption: "mini-light",
    },
    {
      price: 28.56,
      priceCost: 24.07,
      deliveryOption: "pac-light",
    },
    {
      price: 65.05,
      priceCost: 45.28,
      deliveryOption: "sedex-light",
    },
  ],
  lowPrice: {
    price: 19.32,
    priceCost: 16.79,
    deliveryOption: "mini-light",
  },
  lowPriceCost: {
    price: 19.32,
    priceCost: 16.79,
    deliveryOption: "mini-light",
  },
};

export const getCalculatedPriceOrder = async (
  payload: CalculatedPriceOrderPayload
): Promise<CalculatedPriceOrder> => {
  const { data } = await api.post<CalculatedPriceOrder>(
    "/calculate-price-order/low-price-type",
    payload
  );

  return data;
};

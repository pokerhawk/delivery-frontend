import { Product, OrderBump } from "../services/product";
import { SaleResponse, TGetSaleResponse } from '../services/sale';

const CHECKOUT_PRODUCT_DATA_KEY = '@CHECKOUT/PRODUCT';
const CHECKOUT_SALE_DATA_KEY = '@CHECKOUT/SALE';
const CHECKOUT_ORDER_BUMP_DATA_KEY = '@CHECKOUT/ORDER_BUMP';
const CHECKOUT_ORDER_SALE_STATUS_KEY = '@CHECKOUT/SALE_STATUS';
const CHECKOUT_SHIPPING_DATA_KEY = '@CHECKOUT/CHECKOUT_SHIPPING_DATA_KEY';
const CHECKOUT_CREDIT_CARD_TAX_DATA_KEY = '@CHECKOUT/CHECKOUT_CREDIT_CARD_TAX_DATA_KEY';

const handleSetProduct = (product: Product) => {
  sessionStorage.setItem(CHECKOUT_PRODUCT_DATA_KEY, JSON.stringify(product));
}

const handleSetTax = (tax: number) => {
  sessionStorage.setItem(CHECKOUT_CREDIT_CARD_TAX_DATA_KEY, JSON.stringify(tax));
}

const handleSetSale = (sale: SaleResponse) => {
  sessionStorage.setItem(CHECKOUT_SALE_DATA_KEY, JSON.stringify(sale));
}

const handleSetOrderBump = (order: OrderBump) => {
  sessionStorage.setItem(CHECKOUT_ORDER_BUMP_DATA_KEY, JSON.stringify(order));
}

const handleSetSaleStatus = (saleStatus: TGetSaleResponse) => {
  sessionStorage.setItem(CHECKOUT_ORDER_SALE_STATUS_KEY, JSON.stringify(saleStatus));
}

const handleSetShippingPrice = (shippingPrice: number) => {
  sessionStorage.setItem(CHECKOUT_SHIPPING_DATA_KEY, JSON.stringify(shippingPrice));
}

const handleGetProduct = (): Product | undefined => {
  const productStringified = sessionStorage.getItem(CHECKOUT_PRODUCT_DATA_KEY);

  if (!productStringified) return undefined;

  const product = JSON.parse(productStringified);

  return product as Product;
}

const handleGetTax = (): number => {
  const shippingTaxStringified = sessionStorage.getItem(CHECKOUT_CREDIT_CARD_TAX_DATA_KEY);

  if (!shippingTaxStringified) return 0;

  const shippingTax = JSON.parse(shippingTaxStringified);

  return shippingTax as number;
}

const handleGetOrderBump = (): OrderBump | undefined => {
  const orderBumpStringified = sessionStorage.getItem(CHECKOUT_ORDER_BUMP_DATA_KEY);

  if (!orderBumpStringified) return undefined;

  const orderBump = JSON.parse(orderBumpStringified);

  return orderBump as OrderBump;
}

const handleGetSale = (): SaleResponse | undefined => {
  const saleStringified = sessionStorage.getItem(CHECKOUT_SALE_DATA_KEY);

  if (!saleStringified) return undefined;

  const sale = JSON.parse(saleStringified);

  return sale as SaleResponse;
}

const handleGetSaleStatus = (): TGetSaleResponse | undefined => {
  const saleStatusStringified = sessionStorage.getItem(CHECKOUT_ORDER_SALE_STATUS_KEY);

  if (!saleStatusStringified) return undefined;

  const sale = JSON.parse(saleStatusStringified);

  return sale as TGetSaleResponse;
}

const handleGetShippingPrice = (): number => {
  const shippingPriceStringified = sessionStorage.getItem(CHECKOUT_SHIPPING_DATA_KEY);

  if (!shippingPriceStringified) return 0;

  const shippingPrice = JSON.parse(shippingPriceStringified);

  return shippingPrice as number;
}

export {
  handleGetProduct,
  handleGetOrderBump,
  handleGetSale,
  handleSetSale,
  handleSetProduct,
  handleSetOrderBump,
  handleSetSaleStatus,
  handleGetSaleStatus,
  handleSetShippingPrice,
  handleGetShippingPrice,
  handleGetTax,
  handleSetTax,
}

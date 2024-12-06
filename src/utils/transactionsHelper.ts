import formatPrice from './format-price';

export const transactionsHelper = {
  getTotalPricePaid: (salePrice: number = 0, shippingPrice: number = 0): string => {
    return formatPrice(salePrice + shippingPrice);
  },
  getReplaceCentsPrice: (salePrice: number = 0): number => {
    return salePrice / 100;
  }
}

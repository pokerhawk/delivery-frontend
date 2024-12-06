import api from "./axios";

type Payload = {
  codeOffer: string;
  destinationUF: string;
  destinationCity: string;
  user?: string;
};

export const postShipping = async (payload: Payload) => {
  const { data } = await api.post(
    "/calculate-price-order/checkout/calculate/shipping",
    payload
  );

  return data;
};

export const postShippingOrderBump = async (payload: Payload) => {
  const { data } = await api.post(
    "/calculate-price-order/checkout/calculate/order-bump",
    payload
  );

  return data;
};

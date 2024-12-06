import useSWR from "swr";
import {
  ChargeShipping,
  OrderBump,
  TypeInterestSale,
} from "../../services/product";
import { useEffect } from "react";
import { useProduct } from "../../hooks/useProduct";
import { saleBaseUrl } from "../constants";
import { getSaleById } from "../../services/sale";

/**
 * @description This hook get data from the sale API
 */
export function useGetSale(saleId?: string) {
  const {
    setProduct,
    setIsLoading,
    setInitialOffer,
    setOffer,
    setExternalSale,
    setIsOwner,
  } = useProduct();

  const { data, error, isLoading } = useSWR(
    saleId && `${saleBaseUrl}/sales/${saleId}`,
    () => {
      if (!saleId) return;

      return getSaleById(saleId);
    },
  );

  useEffect(() => {
    if (!data) return;

    setExternalSale(data.data);

    const { offer, offerOrderBump } = data.data;

    if (!offer || !offerOrderBump) return;

    setOffer({
      ...offer,
      bannersCheckout: [],
      deadlineForReimbursement: 0,
      installmentInterest: 0,
      pixDiscount: 0,
      main: false,
      active: true,
      thankYouPage: "",
      productId: offer.product.id,
      support: {
        emailSupport: offer.product.email_support ?? "",
        phoneSupport: offer.product.phone_support ?? "",
      },
      orderBump: offerOrderBump.map(
        (orderBump) =>
          ({
            // TODO: This prop is used only for the marketplace sale logic.
            boxId: "",
            chargeShipping: orderBump.chargeShipping as ChargeShipping,
            code: orderBump.code,
            comission: orderBump.commission,
            description: orderBump.description,
            id: orderBump.id,
            // TODO: This prop is used only for the marketplace sale logic.
            offerId: "",
            price: orderBump.price,
            priceFrom: orderBump.priceFrom,
            productId: orderBump?.product?.id ?? "",
            quantityProducts: orderBump?.product?.quantity ?? 0,
            sendBy360: orderBump.sendBy360,
            textButton: orderBump.textButton,
            textPrice: orderBump.textPrice,
            thankYouPage: "",
            title: orderBump.title,
            // TODO: This prop is used only for the marketplace sale logic.
            typeDeliveryPermission: {
              mini: true,
              pac: true,
              sedex: true,
            },
          }) satisfies OrderBump,
      ),
      createdAt: new Date(offer.createdAt),
      updatedAt: new Date(),
      deletedAt: new Date(),
      typeInterestSale: offer.typeInterestSale as TypeInterestSale,
      chargeShipping: offer.chargeShipping as ChargeShipping,
      scheduledDelivery: false,
    });

    setInitialOffer({
      ...offer,
      bannersCheckout: [],
      deadlineForReimbursement: offer.deadlineForReimbursement,
      // TODO: Check why do we need this property
      installmentInterest: 1.0,
      pixDiscount: offer.pixDiscount,
      paymentBankBillet: offer.paymentBankBillet,
      // NOTE: This is needed because when we have the unified concept of carts with multiple items.
      main: true,
      active: true,
      thankYouPage: "",
      productId: "",
      support: {
        emailSupport: offer.product.email_support ?? "",
        phoneSupport: offer.product.phone_support ?? "",
      },
      orderBump: [],
      createdAt: new Date(offer.createdAt),
      updatedAt: new Date(),
      deletedAt: new Date(),
      typeInterestSale: offer.typeInterestSale as TypeInterestSale,
      chargeShipping: offer.chargeShipping as ChargeShipping,
      scheduledDelivery: false,
    });

    // TODO: this is really needed?
    setIsOwner(true);

    setProduct({
      id: offer.product_id,
      name: offer.product.name,
      // TODO: this is really needed?
      userId: "",
      temporary: false,
      provider: offer.product.product_provider,
      description: offer.product.description,
      sku: offer.product.sku,
      unitMeasurement: offer.product.unitMeasurement ?? "",
      width: offer.product.width,
      height: offer.product.height,
      depth: offer.product.depth,
      weight: offer.product.weight,
      coverImage: offer.product.coverImage,
      type: offer.product.type,
      // TODO: this is really needed?
      validity: new Date(),
      // TODO: this is really needed?
      cnpjFactory: "",
      priceSale: data.data.salePrice,
      // TODO: this is really needed?
      saleForCompany: true,
      disable: false,
      status: data.data.status,
    });

    setIsLoading(false);
  }, [data]);

  return {
    data: data?.data,
    error,
    isLoading,
  };
}

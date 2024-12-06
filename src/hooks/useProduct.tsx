import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ADSPropsType, Offer, OrderBump, Product } from "../services/product";
import { postShipping, postShippingOrderBump } from "../services/shipping";
import {
  handleGetOrderBump,
  handleGetProduct,
  handleGetShippingPrice,
  handleGetTax,
  handleSetOrderBump,
  handleSetProduct,
  handleSetShippingPrice,
  handleSetTax,
} from "./usePersistData";
import { ExternalSale } from "../services/sale";

export type UTM = {
  campaign: string | undefined;
  source: string | undefined;
  medium: string | undefined;
  data1: string | undefined;
  data2: string | undefined;
};

export type ProductContextType = {
  offer?: Offer;
  setOffer: (offer: Offer) => void;
  ads?: ADSPropsType[];
  setAds: (offer: ADSPropsType[]) => void;
  product?: Product;
  setProduct: (product: Product) => void;
  externalSale?: ExternalSale;
  setExternalSale: (sale: ExternalSale) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  affiliationCode: string;
  setAffiliationCode: (code: string) => void;
  totalPrice: number;
  setTotalPrice: (total: number) => void;
  selectedOrderBump?: OrderBump;
  setSelectedOrderBump: (orderBump?: OrderBump) => void;
  handleResetOffer: () => void;
  handlePriceOrder: (state: string, city: string) => void;
  setInitialOffer: (offer: Offer) => void;
  shippingPrice: number;
  installmentTax: number;
  setInstallmentTax: (value: number) => void;
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  utm?: UTM | undefined;
  setUtm: React.Dispatch<React.SetStateAction<UTM | undefined>>;
};

export type ProductProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export function ProductProvider({ children }: ProductProviderProps) {
  const [product, setStateProduct] = useState<Product | undefined>(() =>
    handleGetProduct()
  );
  const [externalSale, setExternalSale] = useState<ExternalSale | undefined>();
  const [shippingPrice, setStateShippingPrice] = useState<number>(() =>
    handleGetShippingPrice()
  );
  const [installmentTax, setStateInstallmentTax] = useState<number>(() =>
    handleGetTax()
  );
  const [offer, setOffer] = useState<Offer | undefined>();
  const [ads, setAds] = useState<ADSPropsType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [affiliationCode, setAffiliationCode] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedOrderBump, setSelectedOrderBump] = useState<
    OrderBump | undefined
  >(() => handleGetOrderBump());
  const [initialOffer, setInitialOffer] = useState({} as Offer);
  const [utm, setUtm] = useState<UTM | undefined>(undefined);

  const setInstallmentTax = (tax: number) => {
    setStateInstallmentTax(tax);

    if (tax) {
      handleSetTax(tax);
    }
  };

  const setProduct = (product: Product | undefined) => {
    setStateProduct(product);

    if (product) {
      handleSetProduct(product);
    }
  };

  const setShippingPrice = (price: number) => {
    setStateShippingPrice(price);

    if (price) {
      handleSetShippingPrice(price);
    }
  };

  const handlePriceOrder = useCallback(
    async (state: string, city: string) => {
      if (selectedOrderBump) {
        if (!externalSale || externalSale?.offer?.shippingType === `360hub`) {
          const data = await postShippingOrderBump({
            user: product?.userId,
            codeOffer: selectedOrderBump.code,
            destinationUF: state,
            destinationCity: city,
          });

          const priceOrder = data?.bestPricing?.price ?? 0;

          setShippingPrice(priceOrder);
        }

        setTotalPrice(selectedOrderBump.price);

        return;
      }

      if (!offer?.code) return;

      if (!externalSale || externalSale?.offer?.shippingType === `360hub`) {
        const data = await postShipping({
          user: product?.userId,
          codeOffer: offer?.code,
          destinationUF: state,
          destinationCity: city,
        });

        const priceOrder = data?.bestPricing?.price ?? 0;
        setShippingPrice(priceOrder);
      }

      if (
        externalSale?.offer?.shippingType === `fixed` &&
        externalSale?.offer?.shippingFixedValue
      ) {
        setShippingPrice(externalSale.offer.shippingFixedValue);
      }
    },
    [offer?.code, offer?.chargeShipping, selectedOrderBump]
  );

  const handleResetOffer = () => {
    setOffer(initialOffer);
  };

  useEffect(() => {
    const price = (selectedOrderBump?.price || offer?.price) ?? 0;

    setTotalPrice(price);
  }, [shippingPrice, offer, selectedOrderBump]);

  useEffect(() => {
    if (!selectedOrderBump) return;

    handleSetOrderBump(selectedOrderBump);
  }, [selectedOrderBump]);

  const value = useMemo(() => {
    return {
      product,
      setProduct,
      externalSale,
      setExternalSale,
      isLoading,
      setIsLoading,
      setOffer,
      offer,
      affiliationCode,
      setAffiliationCode,
      totalPrice,
      setTotalPrice,
      selectedOrderBump,
      setSelectedOrderBump,
      handlePriceOrder,
      setInitialOffer,
      handleResetOffer,
      shippingPrice,
      installmentTax,
      setInstallmentTax,
      isOwner,
      setIsOwner,
      utm,
      setUtm,
      setAds,
      ads,
    };
  }, [
    externalSale,
    setExternalSale,
    product,
    setProduct,
    isLoading,
    setIsLoading,
    offer,
    setOffer,
    totalPrice,
    setTotalPrice,
    selectedOrderBump,
    handlePriceOrder,
    setSelectedOrderBump,
    setInitialOffer,
    handleResetOffer,
    shippingPrice,
    installmentTax,
    setInstallmentTax,
    isOwner,
    setIsOwner,
    utm,
    setUtm,
    ads,
    setAds,
  ]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);

  return context;
};

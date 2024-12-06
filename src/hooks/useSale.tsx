import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { SaleResponse, TGetSaleResponse } from "../services/sale";
import { handleGetSale, handleGetSaleStatus, handleSetSale, handleSetSaleStatus } from "./usePersistData";

export type SaleContextType = {
  sale?: SaleResponse;
  setSale: (sale: SaleResponse) => void;
  saleStatus?: TGetSaleResponse;
  setSaleStatus: (saleStatus: TGetSaleResponse) => void;
};

export type SaleProviderProps = {
  children: ReactNode;
};

export const SaleContext = createContext<SaleContextType>(
  {} as SaleContextType
);

export function SaleProvider({ children }: SaleProviderProps) {
  const [sale, setStateSale] = useState<SaleResponse | undefined>(() => handleGetSale());
  const [saleStatus, setStateSaleStatus] = useState<TGetSaleResponse | undefined>(() => handleGetSaleStatus());

  const setSaleStatus = (saleStatus: TGetSaleResponse | undefined) => {
    setStateSaleStatus(saleStatus);

    if (saleStatus) {
      handleSetSaleStatus(saleStatus);
    }
  }

  const setSale = (sale: SaleResponse | undefined) => {
    setStateSale(sale);

    if (sale) {
      handleSetSale(sale);
    }
  }

  const value = useMemo(() => {
    return {
      sale,
      setSale,
      saleStatus,
      setSaleStatus,
    };
  }, [sale, setSale, saleStatus, setSaleStatus]);

  return <SaleContext.Provider value={value}>{children}</SaleContext.Provider>;
}

export const useSale = () => {
  const context = useContext(SaleContext);

  return context;
};

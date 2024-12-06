import useSWR from "swr";
import { BannerImage, getOffer } from "../../services/product";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";

/**
 * @description This hook get data from the core API
 */
export function useGetAffiliation(
  affiliationCode?: string,
  offerCode?: string,
) {
  const [topBanner, setTopBanner] = useState<BannerImage | undefined>();
  const [sideBanners, setSideBanners] = useState<BannerImage[] | undefined>();

  const {
    setProduct,
    setIsLoading,
    setInitialOffer,
    setOffer,
    setAds,
    setIsOwner,
  } = useProduct();

  const { data, error, isLoading } = useSWR(
    affiliationCode && `/affiliation/checkout/info/${affiliationCode}`,
    () => {
      if (!affiliationCode) return;
      return getOffer(affiliationCode, offerCode);
    },
  );

  useEffect(() => {
    if (!data) return;

    const { product, ads, isOwner, offer } = data;

    const banners = offer.bannersCheckout;
    const topBanner = banners?.find((banner) => banner.type === `top`);
    const restBanners = banners?.filter((banner) => banner.type !== `top`);

    setTopBanner(topBanner);
    setSideBanners(restBanners);

    setOffer(offer);
    setInitialOffer(offer);
    setIsOwner(isOwner);
    setAds(ads);
    setProduct({
      ...product,
      priceSale: offer?.price,
    });
    setIsLoading(false);
  }, [data]);

  return {
    data,
    error,
    isLoading,
    topBanner,
    sideBanners,
  };
}

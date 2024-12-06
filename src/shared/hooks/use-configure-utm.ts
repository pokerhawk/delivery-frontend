import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { getCookiesObject } from "../../utils/get-cookies-object";

export function useConfigureUtm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setUtm } = useProduct();

  useEffect(() => {
    if (
      !Cookies ||
      typeof window === "undefined" ||
      typeof document === "undefined"
    )
      return;

    const cookies = getCookiesObject();

    const campaign = cookies?.get("utm_campaign") ?? undefined;
    const source = cookies?.get("utm_source") ?? undefined;
    const medium = cookies?.get("utm_medium") ?? undefined;
    const data1 = cookies?.get("utm_data1") ?? undefined;
    const data2 = cookies?.get("utm_data2") ?? undefined;

    campaign && searchParams.set("utm_campaign", campaign);
    source && searchParams.set("utm_source", source);
    medium && searchParams.set("utm_medium", medium);
    data1 && searchParams.set("utm_data1", data1);
    data2 && searchParams.set("utm_data2", data2);

    setSearchParams(searchParams);

    campaign &&
      Cookies.remove("utm_campaign", {
        path: "",
        domain: ".360h.com.br",
        secure: true,
      });
    source &&
      Cookies.remove("utm_source", {
        path: "",
        domain: ".360h.com.br",
        secure: true,
      });
    medium &&
      Cookies.remove("utm_medium", {
        path: "",
        domain: ".360h.com.br",
        secure: true,
      });
    data1 &&
      Cookies.remove("utm_data1", {
        path: "",
        domain: ".360h.com.br",
        secure: true,
      });
    data2 &&
      Cookies.remove("utm_data2", {
        path: "",
        domain: ".360h.com.br",
        secure: true,
      });
  }, [Cookies, searchParams]);

  useEffect(() => {
    const campaign = searchParams.get("utm_campaign") ?? undefined;
    const source = searchParams.get("utm_source") ?? undefined;
    const medium = searchParams.get("utm_medium") ?? undefined;
    const data1 = searchParams.get("utm_data1") ?? undefined;
    const data2 = searchParams.get("utm_data2") ?? undefined;

    setUtm({ campaign, source, medium, data1, data2 });
  }, [searchParams, setUtm]);
}

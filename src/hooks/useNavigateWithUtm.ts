import {useNavigate, useSearchParams} from "react-router-dom";

type GoToParams = {
  path?: string;
  externalUrl?: string;
  affiliationCode?: string;
  saleId: string;
}

/**
 * This function exists to group the same behavior of sending the user to the
 * feedback page with everything baked into the url, both the
 * affiliation/saleId and all the UTM information saved into the cookies.
 */
export function useNavigateWithUtm() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams()

  const goTo = ({ path = '/feedback', externalUrl, affiliationCode, saleId }: GoToParams) => {
    const campaign = searchParams.get("utm_campaign") ?? undefined;
    const source = searchParams.get("utm_source") ?? undefined;
    const medium = searchParams.get("utm_medium") ?? undefined;
    const data1 = searchParams.get("utm_data1") ?? undefined;
    const data2 = searchParams.get("utm_data2") ?? undefined;

    const search = new URLSearchParams();

    affiliationCode && search.set("affiliationCode", affiliationCode);
    search.set("id", saleId);

    campaign && search.set("utm_campaign", campaign);
    source && search.set("utm_source", source);
    medium && search.set("utm_medium", medium);
    data1 && search.set("utm_data1", data1);
    data2 && search.set("utm_data2", data2);

    if (externalUrl) {
      const url = new URL(externalUrl)
      const combinedSearchParams = new URLSearchParams({...Object.fromEntries(url.searchParams), ...Object.fromEntries(search) })

      url.search = combinedSearchParams.toString()

      window.location.href = url.toString()
      return
    }

    navigate({
      pathname: path,
      search: search.toString(),
    });
  };

  return {
    goTo,
  };
}

import { useState } from "react";
import { Abandonment, postAbandonment } from "../services/sale";
import { useQuery } from "./useQuery";
import { useParams } from "react-router-dom";
import { CheckoutSchemaType } from "../shared/schemas/checkout";

const TRACK_LEAVING_EVENT_TIMES = "TRACK_LEAVING_EVENT_TIMES";

function useDebounce<T>(callback: (data: T) => void, delay: number) {
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  return (data: T) => {
    timer && clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        callback(data);
      }, delay),
    );
  };
}

export function useTrackUserLeavingEvents(limit = 10) {
  const query = useQuery()
  const { affiliationCode } = useParams<{ affiliationCode: string }>();

  type Data = Pick<Abandonment, 'paymentMethod'> & Partial<CheckoutSchemaType>

  const fromFormValuesToAbandonment = (data: Data): Abandonment | null => {
    if (!window) return null
    if (!data?.userData?.name || !data?.userData?.email) return null

    const offerCode = query.get('off')

    return {
      checkoutUrl: window.location.href,
      affiliationCode,
      offerCode: offerCode || null,
      name: data.userData.name,
      email: data.userData.email,
      paymentMethod: data?.paymentMethod || null,
      document: data.userData?.document?.replace(/\D/g, '') || null,
      phone: data.userData?.phone?.replace(/\D/g, '') || null,
      zipcode: data?.addressData?.zipCode?.replace(/\D/g, '') || null,
      street: data?.addressData?.street || null,
      streetNumber: data?.addressData?.number || null,
      complement: data?.addressData?.complement || null,
      neighborhood: data?.addressData?.neighborhood || null,
      city: data?.addressData?.city || null,
      state: data?.addressData?.uf || null,
    }
  }

  const persistTrackLeaving = () => {
    const trackLeaving =
      Number(sessionStorage.getItem(TRACK_LEAVING_EVENT_TIMES)) ?? 0;

    sessionStorage.setItem(
      TRACK_LEAVING_EVENT_TIMES,
      JSON.stringify(trackLeaving + 1),
    );
  }

  const attachTrackLeavingEvents = (data: Data) => {
    if (Number(sessionStorage.getItem(TRACK_LEAVING_EVENT_TIMES)) >= limit) {
      return;
    }

    if (!data?.userData?.name || !data?.userData?.email) return

    const abandonmentData = fromFormValuesToAbandonment(data)

    abandonmentData && postAbandonment(abandonmentData)

    persistTrackLeaving()
  };

  const trackEvent = (data: Data) => {
    if (Number(sessionStorage.getItem(TRACK_LEAVING_EVENT_TIMES)) >= limit) {
      return;
    }

    const abandonmentData = fromFormValuesToAbandonment(data)

    abandonmentData && postAbandonment(abandonmentData)

    persistTrackLeaving()
  }

  const debounced = useDebounce(attachTrackLeavingEvents, 1000);

  return {
    attachTrackLeavingEvents: debounced,
    trackEvent
  };
}

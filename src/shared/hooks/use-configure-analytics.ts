import { useEffect } from "react";
import { getPixelsIds, trackSingle } from "../../services/facebook_pixel";
import TagManager from "react-gtm-module";

/**
 * @description This function has the sole purpose of configuring both facebook Pixel and google GTM
 */
export function useConfigureAnalytics(gtmId?: string) {
  useEffect(() => {
    const pixels = getPixelsIds();

    trackSingle(pixels, "PageView");
    trackSingle(pixels, "InitiateCheckout");
  }, []);

  useEffect(() => {
    if (!gtmId) return;

    TagManager.initialize({
      gtmId,
    });
  }, []);
}

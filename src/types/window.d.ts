export {};

type NewCardParams = {
  number: string;
  holder: string;
  expiresAt: string;
  cvv: string;
};

type Card = any;

declare global {
  interface Window {
    GalaxPay: new (token: string, isProduction: boolean) => {
      newCard: (param: NewCardParams) => Card;
      hashCreditCard: (
        card: Card,
        sucessFuction: (hash: string) => hash,
        errorFuction?: (error: string) => void
      ) => hash | null;
    };
    fbq: (
      command: string,
      facebookpixel?: string,
      eventName?: string,
      options?: any
    ) => void;
    dataLayer: any;
    facebookPixel: string;
  }
}

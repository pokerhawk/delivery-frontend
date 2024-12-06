import TimerCountdown from "../../components/TimerCountdown";
import * as CheckoutAtoms from "../../components/CheckoutAtoms";
import Footer from "../../components/Footer";
import { useGetSale } from "../../shared/hooks/use-get-sale";
import { useParams } from "react-router-dom";
import ProductInfo from "../../components/ProductInfo";
import { Stepper } from "../../components/Stepper";
import { useFormUserPersistedData } from "../../hooks/useFormUserPersistedData";
import { useActiveStep } from "../../components/Stepper/useActiveStep";
import { useGetCheckoutSteps } from "../../shared/hooks/use-get-checkout-steps";
import UserDataForm from "../../components/UserDataForm";
import AddressDataForm from "../../components/AddressDataForm";
import Reimbursement from "../../components/Reimbursement";
import CartSection from "../../components/CartSection";
import Payment from "../../components/Payment";
import HelpSection from "../../components/HelpSection";
import { useConfigureAnalytics } from "../../shared/hooks/use-configure-analytics";
import { useConfigureUtm } from "../../shared/hooks/use-configure-utm";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";
import { useData } from "./useData";
import { GeneralLoading } from "../../components/GeneralLoading";

export function ExternalCheckout() {
  const query = useQuery();

  useConfigureUtm();
  useConfigureAnalytics(query.get("gtm") ?? undefined);

  const checkoutPaymentOption = {
    creditCard: true,
    bankBillet: true,
    pix: true
  };

  const { saleId } = useParams<{ saleId: string }>();

  const { data, isLoading } = useGetSale(saleId);

  const productIsPhysical = data?.offer?.product
    ? data?.offer?.product?.type === "physical"
    : undefined;

  const { state, dispatch } = useFormUserPersistedData();

  const { getActiveStep } = useActiveStep();

  const activeStep = getActiveStep();

  const steps = useGetCheckoutSteps(productIsPhysical);

  const { onPaymentSlipSubmit, onPaymentPixSubmit, onCardSubmit } =
    useData(state);

  useEffect(() => {
    if (!data?.offer?.product?.name) return;

    document.title = data.offer.product.name;
  }, [data]);

  if (!data || isLoading) return <GeneralLoading />;

  return (
    <>
      <TimerCountdown />

      <CheckoutAtoms.Wrapper>
        <CheckoutAtoms.Container key={1}>
          <CheckoutAtoms.Content>
            <ProductInfo />

            <Stepper steps={steps} />

            {activeStep === 1? (
              <UserDataForm state={state} dispatch={dispatch} stepperFooterSpanTitle="Continuar" />
            ) : null}

            {productIsPhysical && activeStep === 2 ? (
              <AddressDataForm state={state} dispatch={dispatch} stepperFooterSpanTitle="Continuar" />
            ) : null}

            {!productIsPhysical && activeStep === 2 ? (
              <>
                <Reimbursement />
                <CartSection />
                {data?.offer && (
                  <Payment
                    checkoutPaymentOption={checkoutPaymentOption}
                    state={state}
                    onCardSubmit={onCardSubmit}
                    onPaymentPixSubmit={onPaymentPixSubmit}
                    onPaymentSlipSubmit={onPaymentSlipSubmit}
                  />
                )}
              </>
            ) : null}

            {activeStep === 3 ? (
              <>
                <Reimbursement />
                <CartSection />
                {data?.offer && (
                  <Payment
                    checkoutPaymentOption={checkoutPaymentOption}
                    state={state}
                    onCardSubmit={onCardSubmit}
                    onPaymentPixSubmit={onPaymentPixSubmit}
                    onPaymentSlipSubmit={onPaymentSlipSubmit}
                  />
                )}
              </>
            ) : null}

            <HelpSection />

            <CheckoutAtoms.FooterWrapper id="content-footer">
              <Footer />
            </CheckoutAtoms.FooterWrapper>
          </CheckoutAtoms.Content>
        </CheckoutAtoms.Container>
      </CheckoutAtoms.Wrapper>
    </>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as CheckoutAtoms from "../../components/CheckoutAtoms";
import AddressDataForm from "../../components/AddressDataForm";
import CartSection from "../../components/CartSection";
import Footer from "../../components/Footer";
import HelpSection from "../../components/HelpSection";
import Payment from "../../components/Payment";
import ProductInfo from "../../components/ProductInfo";
import Reimbursement from "../../components/Reimbursement";
import TimerCountdown from "../../components/TimerCountdown";
import UserDataForm from "../../components/UserDataForm";
import { useProduct } from "../../hooks/useProduct";
import { Stepper } from "../../components/Stepper";
import { useActiveStep } from "../../components/Stepper/useActiveStep";
import { useQuery } from "../../hooks/useQuery";
import { useFormUserPersistedData } from "../../hooks/useFormUserPersistedData";
import { useConfigureUtm } from "../../shared/hooks/use-configure-utm";
import { useGetCheckoutSteps } from "../../shared/hooks/use-get-checkout-steps";
import { useConfigureAnalytics } from "../../shared/hooks/use-configure-analytics";
import { useGetAffiliation } from "../../shared/hooks/use-get-affiliation";
import { useData } from "./useData";
import { GeneralLoading } from "../../components/GeneralLoading";
import getAffiliation from "../../services/affiliation";
import { getCheckoutPaymentOption } from "../../services/sale";

export function MarketplaceCheckout() {
  const navigate = useNavigate();
  const query = useQuery();

  const { affiliationCode } = useParams<{ affiliationCode: string }>();
  const [ checkoutPaymentOption, setCheckoutPaymentOption ] = useState({
    creditCard: true,
    bankBillet: true,
    pix: true
  });

  useConfigureUtm();
  useConfigureAnalytics(query.get("gtm") ?? undefined);

  const { setAffiliationCode } = useProduct();

  const { data, isLoading, topBanner, sideBanners } = useGetAffiliation(
    affiliationCode,
    query.get("off") ?? undefined,
  );

  const productIsPhysical = data?.product
    ? data?.product?.type === "physical"
    : undefined;

  const { state, dispatch } = useFormUserPersistedData();

  const { onCardSubmit, onPaymentPixSubmit, onPaymentSlipSubmit } =
    useData(state);

  const { getActiveStep } = useActiveStep();

  const activeStep = getActiveStep();

  const steps = useGetCheckoutSteps(productIsPhysical);

  getAffiliation(affiliationCode).then(affiliation=>{
    if(affiliation.userId)
      getCheckoutPaymentOption(affiliation.userId).then(cpo=>{
        if(cpo.id)
          setCheckoutPaymentOption({
            creditCard: cpo.creditCard,
            bankBillet: cpo.bankBillet,
            pix: cpo.pix
          })
      })
  })

  useEffect(() => {
    if (!affiliationCode) {
      navigate("/404");
      return;
    }

    setAffiliationCode(affiliationCode);
  }, [affiliationCode]);

  useEffect(() => {
    if (data?.offer.scheduledDelivery){
      navigate("/404");
      return;
    }
    if (!data?.product?.name) return;

    document.title = data.product.name;
  }, [data]);

  if (isLoading || !data) {
    return <GeneralLoading />;
  }

  return (
    <>
      <TimerCountdown />

      <CheckoutAtoms.Wrapper>
        {topBanner?.url && topBanner?.status === "active" ? (
          <CheckoutAtoms.TopBannerImage src={topBanner?.url} alt="top banner" />
        ) : null}

        <CheckoutAtoms.Container key={1}>
          <CheckoutAtoms.Content>
            <ProductInfo />

            <Stepper steps={steps} />

            {activeStep === 1 ? (
              <UserDataForm state={state} dispatch={dispatch} stepperFooterSpanTitle="Continuar" />
            ) : null}

            {productIsPhysical && activeStep === 2 && (
              <AddressDataForm state={state} dispatch={dispatch} stepperFooterSpanTitle="Continuar" />
            )}

            {!productIsPhysical && activeStep === 2 && (
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
            )}

            {activeStep === 3 && (
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
            )}

            <HelpSection />

            <CheckoutAtoms.FooterWrapper id="content-footer">
              <Footer />
            </CheckoutAtoms.FooterWrapper>
          </CheckoutAtoms.Content>

          {sideBanners?.length && sideBanners[0].status === "active" ? (
            <div>
              <CheckoutAtoms.Side>
                {sideBanners.map(({ id, url }) => (
                  <CheckoutAtoms.SideBannerImage
                    src={url}
                    alt="aside image"
                    key={id}
                  />
                ))}
              </CheckoutAtoms.Side>

              <CheckoutAtoms.FooterWrapper id="aside-footer">
                <Footer />
              </CheckoutAtoms.FooterWrapper>
            </div>
          ) : null}
        </CheckoutAtoms.Container>
      </CheckoutAtoms.Wrapper>
    </>
  );
}

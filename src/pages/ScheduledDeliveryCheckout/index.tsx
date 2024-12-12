// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import * as CheckoutAtoms from "../../components/CheckoutAtoms";
// import AddressDataForm from "../../components/AddressDataForm";
// import Footer from "../../components/Footer";
// import HelpSection from "../../components/HelpSection";
// import ProductInfo from "../../components/ProductInfo";
// import TimerCountdown from "../../components/TimerCountdown";
// import UserDataForm from "../../components/UserDataForm";
// // import { useProduct } from "../../hooks/useProduct";
// import { Stepper } from "../../components/Stepper";
// import { useActiveStep } from "../../components/Stepper/useActiveStep";
// import { useQuery } from "../../hooks/useQuery";
// import { useFormUserPersistedData } from "../../hooks/useFormUserPersistedData";
// import { useConfigureUtm } from "../../shared/hooks/use-configure-utm";
// import { useConfigureAnalytics } from "../../shared/hooks/use-configure-analytics";
// import { useGetAffiliation } from "../../shared/hooks/use-get-affiliation";
// // import { useData } from "./useData";
// import { GeneralLoading } from "../../components/GeneralLoading";
// import { useGetDeliverySteps } from "../../shared/hooks/use-get-delivery-steps";

// export function ScheduledDeliveryCheckout() {
//   const navigate = useNavigate();
//   const query = useQuery();

//   const { affiliationCode } = useParams<{ affiliationCode: string }>();

//   useConfigureUtm();
//   useConfigureAnalytics(query.get("gtm") ?? undefined);

//   // const { setAffiliationCode } = useProduct();
//   const { data, isLoading, topBanner, sideBanners } = useGetAffiliation(
//     affiliationCode,
//     query.get("off") ?? undefined,
//   );
//   const { state, dispatch } = useFormUserPersistedData();
//   // const { onScheduledDeliverySubmit } = useData(state);
//   const { getActiveStep } = useActiveStep();
//   const activeStep = getActiveStep();
//   const steps = useGetDeliverySteps(true);

//   useEffect(() => {
//     if (!affiliationCode) {
//       navigate("/404");
//       return;
//     }

//     // setAffiliationCode(affiliationCode);
//   }, [affiliationCode]);

//   useEffect(() => {
//     if (!data?.product?.name) return;

//     document.title = data.product.name;
//   }, [data]);

//   if (isLoading || !data) {
//     return <GeneralLoading />;
//   }

//   return (
//     <>
//       <TimerCountdown />

//       <CheckoutAtoms.Wrapper>
//         {topBanner?.url && topBanner?.status === "active" ? (
//           <CheckoutAtoms.TopBannerImage src={topBanner?.url} alt="top banner" />
//         ) : null}

//         <CheckoutAtoms.Container key={1}>
//           <CheckoutAtoms.Content>
//             <ProductInfo />

//             <Stepper steps={steps} />

//             {activeStep === 1 ? (
//               <UserDataForm state={state} dispatch={dispatch} stepperFooterSpanTitle="Continuar" />
//             ) : null}

//             {activeStep === 2 && (
//               <AddressDataForm state={state} dispatch={dispatch} onScheduledDeliverySubmit={onScheduledDeliverySubmit} stepperFooterSpanTitle="Finalizar" />
//             )}

//             <HelpSection />

//             <CheckoutAtoms.FooterWrapper id="content-footer">
//               <Footer />
//             </CheckoutAtoms.FooterWrapper>
//           </CheckoutAtoms.Content>

//           {sideBanners?.length && sideBanners[0].status === "active" ? (
//             <div>
//               <CheckoutAtoms.Side>
//                 {sideBanners.map(({ id, url }) => (
//                   <CheckoutAtoms.SideBannerImage
//                     src={url}
//                     alt="aside image"
//                     key={id}
//                   />
//                 ))}
//               </CheckoutAtoms.Side>

//               <CheckoutAtoms.FooterWrapper id="aside-footer">
//                 <Footer />
//               </CheckoutAtoms.FooterWrapper>
//             </div>
//           ) : null}
//         </CheckoutAtoms.Container>
//       </CheckoutAtoms.Wrapper>
//     </>
//   );
// }

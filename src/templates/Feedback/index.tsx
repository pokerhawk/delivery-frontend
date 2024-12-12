import { useEffect, useState } from "react";
import { getSaleStatus } from "../../services/sale";

import { getPaymentsToRender } from "../../pages/Feedback/helpers/transactionsHelper";
import { IRenderPaymentMethod } from "../../pages/Feedback/types/transactions.types";

import { useSearchParams } from "react-router-dom";
import { getOffer } from "../../services/product";

import BoletoPaidTemplate from "./components/Boleto";
import PixPaidTemplate from "./components/Pix";
import ProcessingTemplate from "./components/Processing";
import ScheduledTemplate from "./components/ScheduledDelivery";

// function FeedbackTemplate() {
//   const [searchParams] = useSearchParams();
//   const saleId = searchParams?.get("id");
//   // const { setProduct, product, setAffiliationCode, setOffer } = useProduct();
//   // const { saleStatus, setSaleStatus, sale } = useSale();
//   const [startedCheckingStatus, setStartedCheckingStatus] = useState(false);
//   const [paymentsMethods, setPaymentsMethods] = useState<IRenderPaymentMethod>({
//     payments: [],
//     containsCreditCard: false,
//   });
//   const paymentMethod = paymentsMethods?.payments[0]?.type;

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleCheckSaleStatus = async (saleId: string) => {
//     try {
//       const saleStatus = await getSaleStatus(saleId);
//       setSaleStatus(saleStatus);
//     } catch (error: any) {
//       console.log("Failed to check sale status", error);
//     } finally {
//       setStartedCheckingStatus(true);
//     }
//   };

//   useEffect(() => {
//     if (saleStatus) {
//       setPaymentsMethods(getPaymentsToRender(saleStatus.transactions));
//     }
//   }, [saleStatus]);

//   useEffect(() => {
//     const affiliationCode = searchParams.get("affiliationCode");
//     const offerId = sale?.offer?.code;
//     openModal();
//     if (!affiliationCode) return;
//     (async () => {
//       const { product, offer /* ads */ } = await getOffer(
//         affiliationCode,
//         offerId,
//       );

//       setAffiliationCode(affiliationCode);
//       setProduct({
//         ...product,
//         priceSale: offer?.price ?? product.priceSale,
//       });
//       setOffer(offer);
//     })();
//   }, []);

//   useEffect(() => {
//     if (!saleId) return;
//     handleCheckSaleStatus(saleId);
//   }, [saleId]);

//   // remover depois de validar o erro
//   useEffect(() => {
//     setInterval(() => {
//       const button = document.createElement("button");
//       button.id = "buttonFeedbackS";
//       button.click();
//     }, 2000);
//   }, []);

//   useEffect(() => {
//     if (!startedCheckingStatus || !saleId) return;

//     const interval = setInterval(() => {
//       handleCheckSaleStatus(saleId);
//     }, 30000); // 30 seconds

//     return () => {
//       clearInterval(interval);
//     };
//   }, [startedCheckingStatus, saleId]);

//   if(saleStatus && saleStatus.description == 'scheduledDelivery'){
//     return (
//       <ScheduledTemplate
//         closeModal={closeModal}
//         isModalOpen={isModalOpen}
//         product={product}
//         saleStatus={saleStatus}
//       />
//     )
//   }

//   if (paymentMethod === "Pix") {
//     const isProcessing = saleStatus?.transactions[0]?.status === "processing";

//     if (isProcessing) {
//       return (
//         <ProcessingTemplate
//           closeModal={closeModal}
//           isModalOpen={isModalOpen}
//           product={product}
//           saleStatus={saleStatus}
//         />
//       );
//     }

//     return <PixPaidTemplate product={product} saleStatus={saleStatus} />;
//   }

//   if (paymentMethod === "Cartão de Crédito") {
//     return (
//       <ProcessingTemplate
//         closeModal={closeModal}
//         isModalOpen={isModalOpen}
//         product={product}
//         saleStatus={saleStatus}
//       />
//     );
//   }

//   if (paymentMethod === "Boleto") {
//     return (
//       <BoletoPaidTemplate
//         closeModal={closeModal}
//         isModalOpen={isModalOpen}
//         product={product}
//         saleStatus={saleStatus}
//       />
//     );
//   }

//   return <div />;
// }

// export default FeedbackTemplate;

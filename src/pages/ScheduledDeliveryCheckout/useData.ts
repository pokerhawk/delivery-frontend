import { addDays, format } from "date-fns";
// import { useProduct } from "../../hooks/useProduct";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import { PaymentMethod, SubmitData, postSale } from "../../services/sale";
import { v4 } from "uuid";
import { removeNonDigitNumbers } from "../../utils/masks";
// import { useSale } from "../../hooks/useSale";
import { useNavigate } from "react-router-dom";

// export function useData(state: CheckoutSchemaType) {
//   const {
//     product,
//     offer,
//     affiliationCode,
//     selectedOrderBump,
//     utm,
//     isOwner,
//     shippingPrice,
//   } = useProduct();
//   const { setSale } = useSale();
//   const navigate = useNavigate();
//   const { goTo } = useNavigateWithUtm();

//   const onScheduledDeliverySubmit = async () => {
//     const referenceId = v4();
//     const disableInstallmentSelect =
//       offer?.chargeShipping === "ChargeCustomerShipping" && shippingPrice <= 0;

//     if (disableInstallmentSelect) return;

//     const { name, phone, document, email, codeArea } = state.userData;
//     const { zipCode, street, number, complement, neighborhood, city, uf } =
//       state.addressData;
//     const date = new Date();
//     const expirationDate = format(addDays(date, 5), "yyyy-MM-dd");

//     if (!product || !offer) return;

//     try {
//       const formattedData: SubmitData = {
//         sellerId: product?.user?.id ?? ``,
//         shippingPrice,
//         salePrice: selectedOrderBump?.price ?? product.priceSale,
//         referenceId,
//         description: "scheduledDelivery",
//         customer: {
//           name,
//           phone: removeNonDigitNumbers(phone),
//           document: removeNonDigitNumbers(document),
//           email,
//           codeArea,
//           address: {
//             zipCode: removeNonDigitNumbers(zipCode),
//             street,
//             number,
//             complement: complement ?? "",
//             neighborhood,
//             city: city ?? "",
//             state: uf ?? "",
//             uf: uf ?? "",
//           },
//         },
//         products: [
//           {
//             id: product.id,
//             price: product.priceSale,
//           },
//         ],
//         transactions: [
//           {
//             paymentMethod: PaymentMethod.pix,
//             value: selectedOrderBump?.price ?? product.priceSale,
//             expirationDate,
//           },
//         ],
//         offerId: offer?.code,
//         affiliationId: affiliationCode,
//         utm: {
//           campaign: utm?.campaign ?? undefined,
//           data1: utm?.data1 ?? undefined,
//           data2: utm?.data2 ?? undefined,
//           medium: utm?.medium ?? undefined,
//           source: utm?.source ?? undefined,
//         },
//       };

//       const response = await postSale({
//         data: {
//           ...formattedData,
//           offerOrderBumpId: selectedOrderBump?.code ?? undefined,
//         },
//         isOwner,
//       });

//       setSale(response);
//       if(!!offer?.thankYouPage){
//         goTo({ externalUrl: offer.thankYouPage, affiliationCode, saleId: response.id });
//       } else {
//         goTo({ affiliationCode, saleId: response.id });
//       }
//     } catch (error: any) {
//       console.log(error)
//       navigate("/404")
//     }
//   };

//   return {
//     onScheduledDeliverySubmit,
//   };
//}

import SuccessIcon from "../../../../components/Icons/Succcess";
import formatPrice from "../../../../utils/format-price";
import { Product } from "../../../../services/product";
import {
  EnumStatusSale,
  TGetSaleResponse,
  getSaleStatus,
} from "../../../../services/sale";

import { useEffect } from "react"
import Footer from "../../../../components/Footer"
import { useProduct } from "../../../../hooks/useProduct";
import { useSale } from "../../../../hooks/useSale";
import * as S from "../../styles";
import ClickModal from "../Modal";
import { useNavigateWithUtm } from "../../../../hooks/useNavigateWithUtm";

type ScheduledTemplateProps = {
  saleStatus?: TGetSaleResponse;
  product?: Product;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ScheduledTemplate = ({
  product,
  saleStatus,
  closeModal,
  isModalOpen,
}: ScheduledTemplateProps) => {
  const {
    offer,
    totalPrice,
    affiliationCode,
    shippingPrice,
    installmentTax,
    selectedOrderBump,
  } = useProduct();
  const { sale, setSaleStatus } = useSale();
  const isPixPayment = sale?.transactions[0]?.paymentMethod === `pix`;
  const { goTo } = useNavigateWithUtm();

  const currentOffer = selectedOrderBump || offer;
  const isFreeShipping =
    currentOffer?.chargeShipping !== "ChargeCustomerShipping";

  const productPrice = totalPrice / 100;
  const shipping = isFreeShipping ? 0 : shippingPrice / 100;
  const tax = installmentTax / 100;
  const pixDiscount = isPixPayment
    ? ((offer?.pixDiscount ?? 0) / 100) * productPrice
    : 0;

  const price = productPrice + shipping + tax - pixDiscount;

  const handleCheckSaleStatus = async () => {
    if (!sale?.id) return;

    const saleId = sale.id;

    try {
      const saleStatus = await getSaleStatus(saleId);
      setSaleStatus(saleStatus);

      if (saleStatus.status === EnumStatusSale.paid) {
        if (!!offer?.thankYouPage) {
          goTo({ externalUrl: offer.thankYouPage, affiliationCode, saleId });
          return;
        }
      }
    } catch (error) {
      console.error("handleCheckSaleStatus", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleCheckSaleStatus();
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, [sale]);

  return (
    <S.Container>
      {/* {isModalOpen && (
        <ClickModal
          text="Leia as informações a seguir com atenção!"
          onClose={closeModal}
          offerPrice={totalPrice}
          sale={sale}
          product={product}
        />
      )} */}
      <S.Box>
        <S.ContainerText>
          <SuccessIcon />
          <S.Title>Obrigado!</S.Title>
          <S.MessageSubtitle>
            Estamos processando sua entrega.
          </S.MessageSubtitle>
          <S.Message>
          Lembrando que o agendamento sendo finalizado hoje antes do meio dia, o seu produto será enviado hoje ainda. Caso contrário, somente amanhã.
          </S.Message>
        </S.ContainerText>

        <S.Divider />

        <S.ProductContainer>
          <S.MessageSubtitle>Você solicitou:</S.MessageSubtitle>
          <S.ProductBoxInfo>
            <S.ProductImage src={product?.coverImage} />
            <S.ProductName>{product?.name}</S.ProductName>
            <S.MessageSubtitle>{formatPrice(price)}</S.MessageSubtitle>
          </S.ProductBoxInfo>

          <S.ProductDetails>
            <S.MessageSubtitle>Informações de entrega:</S.MessageSubtitle>

            <S.ProductDetailsAddress>
              {saleStatus?.customer.name}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.street} -{" "}
              {saleStatus?.customer.address?.number}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.neighborhood}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.city} -{" "}
              {saleStatus?.customer.address?.state}
            </S.ProductDetailsAddress>
            <S.ProductDetailsAddress>
              {saleStatus?.customer.address?.zipcode}
            </S.ProductDetailsAddress>
          </S.ProductDetails>
        </S.ProductContainer>
      </S.Box>
      <Footer />
    </S.Container>
  );
};

export default ScheduledTemplate;

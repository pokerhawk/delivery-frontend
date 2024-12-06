import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Card, { Focused } from "react-credit-cards-2";
import { Controller, useForm } from "react-hook-form";
import { v4 } from "uuid";

import Button from "../Button";
import Input from "../Input";
import Select from "../Select";

import { useProduct } from "../../hooks/useProduct";
import { CheckoutSchemaType } from "../../shared/schemas/checkout";
import {
  PaymentMethod,
  SubmitData,
  getSaleStatus,
  postSale,
} from "../../services/sale";
import {
  cardMask,
  cpfMask,
  hostNameMask,
  removeNonDigitNumbers,
} from "../../utils/masks";

import AmexBrand from "../../assets/amex-brand.jpg";
import DinersBrand from "../../assets/diners-brand.jpg";
import EloBrand from "../../assets/elo-brand.jpg";
import HiperBrand from "../../assets/hiper-brand.jpg";
import MasterBrand from "../../assets/master-brand.jpg";
import VisaBrand from "../../assets/visa-brand.jpg";
import { useSale } from "../../hooks/useSale";
import { TAX, createInstallments } from "../../utils/calculate-installments";
import { validarNumeroCartaoCredito } from "../../utils/check-credit-card";
import FeedbackModal from "../FeedbackModal";
import AlertIcon from "../Icons/Alert";
import PriceTable from "../PriceTable";
import ProcessingModal from "../ProcessingModal";
import {
  CreditCardFormSchema,
  Months,
  YearOptions,
  creditCardSchema,
} from "./misc";
import * as S from "./styled";
import { useNavigateWithUtm } from "../../hooks/useNavigateWithUtm";
import { Props } from "../Payment";

type CardProps = {
  creditCardIllustration?: boolean;
  state: CheckoutSchemaType;
  processCardSubmit: Props["onCardSubmit"];
};

function PaymentCard({
  creditCardIllustration = true,
  state,
  processCardSubmit,
}: CardProps) {
  const referenceId = v4();
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm<CreditCardFormSchema>({
    resolver: yupResolver(creditCardSchema),
    defaultValues: {
      expiryMonth: Months[0].value,
      expiryYear: YearOptions[0].value,
      installments: 1,
      cardHolder: state.userData.name.toLocaleUpperCase(),
      cardDocument: state.userData.document,
    },
  });

  const {
    product,
    isLoading,
    offer,
    affiliationCode,
    totalPrice,
    selectedOrderBump,
    utm,
    setInstallmentTax,
    isOwner,
    shippingPrice,
  } = useProduct();
  const { setSale, setSaleStatus } = useSale();
  const [currentFocus, setCurrentFocus] = useState<Focused>("number");
  const [isOpenProcessing, setIsOpenProcessing] = useState(false);
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isFreeShipping = offer?.chargeShipping !== "ChargeCustomerShipping";

  const { goTo } = useNavigateWithUtm();

  const disableInstallmentSelect =
    offer?.chargeShipping === "ChargeCustomerShipping" && shippingPrice <= 0;

  const cardNumber = watch("cardNumber");
  const cardHolder = watch("cardHolder");
  const cvv = watch("cvv");
  const expiryMonth = watch("expiryMonth");
  const expiryYear = watch("expiryYear");
  const expiry = () => {
    if (!expiryMonth || !expiryYear) return undefined;

    return expiryMonth + "/" + expiryYear;
  };

  const handleFocused = (focus: Focused) => {
    setCurrentFocus(focus);
  };

  const handleToggleProcessing = () => {
    setIsOpenProcessing((prev) => !prev);
  };

  const handleToggleFeedback = () => {
    setIsOpenFeedback((prev) => !prev);
  };

  const onSubmit = async (data: CreditCardFormSchema) => {
    setFetching(true);

    await processCardSubmit(
      data,
      handleToggleProcessing,
      handleToggleFeedback,
      handleCheckSaleStatus,
      setErrorMessage
    );

    setFetching(false);
  };

  const handleCheckSaleStatus = async (saleId: string) => {
    try {
      const saleStatus = await getSaleStatus(saleId);
      setSaleStatus(saleStatus);

      /* if (!!offer?.thankYouPage) {
        window.location.replace(offer.thankYouPage);
        return;
      }
      */

      goTo({ affiliationCode, saleId });
    } catch (error) {
      console.error("HandleCheckSaleStatus: ", error);
    }
  };

  const installmentsNumber = offer?.typeInterestSale === "InCash" ? 1 : 12;

  const installmentsOptions = useMemo(() => {
    if (!offer) return;

    return createInstallments({
      installments: installmentsNumber,
      interestTax: TAX[offer.typeInterestSale],
      typeInterestSale: offer.typeInterestSale,
      total: totalPrice + (isFreeShipping ? 0 : shippingPrice),
    });
  }, [totalPrice, shippingPrice, isFreeShipping]);

  useEffect(() => {
    if (
      cardHolder &&
      cardHolder.length > 0 &&
      cardHolder.split(" ").filter((item) => item != "").length < 2
    ) {
      return setError("cardHolder", {
        message: "Informe ao menos um sobrenome",
      });
    }

    const lastName = cardHolder.split(" ").pop();

    if (
      cardHolder &&
      cardHolder.length > 0 &&
      lastName &&
      lastName.toString().length <= 1
    ) {
      setError("cardHolder", {
        message: "O sobrenome deve ter ao menos 2 letras",
      });

      return;
    }

    clearErrors(["cardHolder"]);
  }, [cardHolder]);

  useEffect(() => {
    setInstallmentTax(0);
    setValue("installments", 1);
  }, [totalPrice, shippingPrice]);

  if (isLoading && !offer) {
    return null;
  }

  const setCreditCardError = (text: string) => {
    if (validarNumeroCartaoCredito(text)) {
      clearErrors("cardNumber");
    } else {
      if (text.length > 0)
        setError(
          "cardNumber",
          {
            message: "Cartão de credito inválido",
          },
          { shouldFocus: true }
        );
      return;
    }
  };

  useEffect(() => {
    setCreditCardError(cardNumber || "");
  }, [cardNumber]);

  return (
    <S.Wrapper>
      <FeedbackModal
        isOpen={isOpenFeedback}
        onRequestClose={handleToggleFeedback}
        title="Pagamento não processado"
        description={errorMessage.replace(".", "") + ", verifique seus dados."}
        button="Tentar novamente"
        icon={<AlertIcon />}
      />

      <ProcessingModal
        isOpen={isOpenProcessing}
        handleClose={handleToggleProcessing}
      />

      <S.Container>
        <S.FormContainer>
          <S.InputsWrapper>
            <Controller
              name="cardNumber"
              control={control}
              defaultValue={""}
              render={({ field: { onChange, ...field } }) => (
                <Input
                  inputMode="numeric"
                  label="Número do cartão"
                  placeholder="0000 0000 0000 0000"
                  onChange={(text) => onChange(cardMask(text.target.value))}
                  onFocus={() => handleFocused("number")}
                  error={errors.cardNumber?.message}
                  maxLength={19}
                  {...field}
                />
              )}
            />
            <Controller
              name="cardHolder"
              control={control}
              defaultValue={""}
              render={({ field: { onChange, ...field } }) => (
                <Input
                  label="Nome do titular"
                  placeholder="Nome impresso no cartão"
                  error={errors.cardHolder?.message}
                  onChange={(text) => onChange(hostNameMask(text.target.value))}
                  {...field}
                />
              )}
            />
            <Controller
              name="cardDocument"
              control={control}
              defaultValue={""}
              render={({ field: { onChange, ...field } }) => (
                <Input
                  inputMode="numeric"
                  label="CPF do titular"
                  placeholder="Digite somente números"
                  error={errors.cardDocument?.message}
                  onChange={(text) => {
                    onChange(cpfMask(text.target.value));
                  }}
                  {...field}
                />
              )}
            />
            <S.CardValidationContainer>
              <Controller
                name="expiryMonth"
                control={control}
                defaultValue={""}
                render={({ field: { onChange, ...field } }) => (
                  <Select
                    label="Mês"
                    options={Months}
                    onFocus={() => handleFocused("expiry")}
                    error={errors.expiryMonth?.message}
                    onChange={(text) => onChange(text.target.value)}
                    {...field}
                  />
                )}
              />
              <Controller
                name="expiryYear"
                control={control}
                defaultValue={""}
                render={({ field: { onChange, ...field } }) => (
                  <Select
                    label="Ano"
                    options={YearOptions}
                    onFocus={() => handleFocused("expiry")}
                    error={errors.expiryYear?.message}
                    onChange={(text) => onChange(text.target.value)}
                    {...field}
                  />
                )}
              />
            </S.CardValidationContainer>
            <Input
              label="CVC ou CVV"
              placeholder="000"
              inputMode="numeric"
              maxLength={3}
              // type="number"
              onFocus={() => handleFocused("cvc")}
              error={errors.cvv?.message}
              {...register("cvv", {
                onChange: (text) => {
                  setValue("cvv", text.target.value.replace(/[^\d]+/g, ""));
                },
              })}
              onBlur={() => handleFocused("number")}
            />
          </S.InputsWrapper>
          <S.SelectContainer>
            <Controller
              name="installments"
              control={control}
              defaultValue={1}
              render={({ field: { onChange, value, ...field } }) => (
                <Select
                  label="Escolha o número de parcelas*"
                  options={installmentsOptions ?? []}
                  error={errors?.installments?.message}
                  disabled={disableInstallmentSelect}
                  onChange={(text) => {
                    const installment = installmentsOptions?.find(
                      ({ value }) => value === text.target.value
                    );

                    const tax = installment?.installmentInterest ?? 0;

                    setInstallmentTax(tax);
                    return onChange(parseInt(text.target.value, 10));
                  }}
                  value={String(value)}
                  {...field}
                />
              )}
            />
            {disableInstallmentSelect && (
              <S.SpanError>
                Preencha o endereço de entrega para prosseguir
              </S.SpanError>
            )}
          </S.SelectContainer>
        </S.FormContainer>

        {creditCardIllustration && (
          <S.CardContainer>
            <Card
              focused={currentFocus}
              cvc={cvv ?? ""}
              expiry={expiry() ?? ""}
              name={cardHolder ?? ""}
              number={cardNumber ?? ""}
              locale={{ valid: "Validade" }}
              placeholders={{
                name: "Nome do titular",
              }}
            />

            <S.BrandsContainer>
              <S.BrandTitle>Bandeiras aceitas:</S.BrandTitle>
              <div className="image-list">
                <img src={EloBrand} alt="Elo" />
                <img src={MasterBrand} alt="Mastercard" />
                <img src={VisaBrand} alt="Visa" />
                <img src={AmexBrand} alt="American Express" />
                <img src={HiperBrand} alt="Hipercard" />
                <img src={DinersBrand} alt="Diners Club International" />
              </div>
            </S.BrandsContainer>
          </S.CardContainer>
        )}
      </S.Container>

      <S.Divider />

      <PriceTable paymentType="credit_card" />

      <S.SubmitContainer>
        <Button
          isLoading={fetching}
          className="btn_buy"
          onClick={handleSubmit(onSubmit)}
          disabled={disableInstallmentSelect}
        >
          Comprar Agora!
        </Button>
      </S.SubmitContainer>
    </S.Wrapper>
  );
}

export default PaymentCard;

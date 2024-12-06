import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { cepMask } from "../../utils/masks";
import Input from "../Input";

import { useProduct } from "../../hooks/useProduct";
import { getAddress } from "../../services/cep";
import FormWrapper from "../FormWrapper";
import * as S from "./styles";
import { useTrackUserLeavingEvents } from "../../hooks/useTrackUserLeavingEvents";
import {
  AddressDataSchema,
  addressDataSchema,
} from "../../shared/schemas/checkout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigateToStep } from "../Stepper/useNavigateToStep";
import { useActiveStep } from "../Stepper/useActiveStep";
import { StepperFooter } from "../Stepper/partials/Footer";
import { useFormUserPersistedData } from "../../hooks/useFormUserPersistedData";
import formatPrice from "../../utils/format-price";
import OverlayModal from "../../templates/Feedback/components/Modal Overlay";

type Props = ReturnType<typeof useFormUserPersistedData> & {
  stepperFooterSpanTitle: string;
  onScheduledDeliverySubmit?: (data: any) => any;
};

function AddressDataForm({ state, dispatch, stepperFooterSpanTitle, onScheduledDeliverySubmit }: Props) {
  const { getActiveStep } = useActiveStep();
  const { goTo } = useNavigateToStep();
  const [ isLoading, setIsLoading] = useState(false);
  const currentUrl = window.location.href;

  const { offer } = useProduct();
  
  const title = offer?.sendBy360
    ? "ENDEREÇO DE ENTREGA"
    : "ENDEREÇO DE FATURAMENTO";

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    clearErrors,
    setError,
  } = useForm<AddressDataSchema>({
    resolver: yupResolver(addressDataSchema),
    mode: "onChange",
    defaultValues: {
      city: state.addressData.city,
      street: state.addressData.street,
      number: state.addressData.number,
      complement: state.addressData.complement,
      neighborhood: state.addressData.neighborhood,
      uf: state.addressData.uf,
      zipCode: state.addressData.zipCode,
    },
  });

  const { attachTrackLeavingEvents } = useTrackUserLeavingEvents();

  const cep = watch("zipCode");
  const formValues = getValues();
  const isScheduledDelivery = currentUrl.includes('scheduledDelivery');
  const price:number = offer?.price?offer?.price:0;

  const handleGetAddress = async (cep: string) => {
    try {
      if (!offer?.code) throw new Error("codeOffer is not defined");

      const { city, neighborhood, street, state } = await getAddress(cep);

      if (street) {
        setValue("street", street);
      }

      if (neighborhood) {
        setValue("neighborhood", neighborhood);
      }

      setValue("city", city);
      setValue("uf", state);

      clearErrors([
        "street",
        "complement",
        "neighborhood",
        "number",
        "city",
        "uf",
        "zipCode",
      ]);
    } catch (error) {
      console.error("handleGetAddress", error);
      setError("zipCode", {
        message: "CEP inválido, tente novamente.",
      });
    }
  };

  const onSubmit = (data: AddressDataSchema) => {
    if(isScheduledDelivery){
      setIsLoading(true)
      state.addressData = data
      if(onScheduledDeliverySubmit)onScheduledDeliverySubmit(state)
    } else {
      goTo(getActiveStep() + 1);
      dispatch({ type: "add_address_data", payload: data });
    }
  };

  useEffect(() => {
    if (!cep) return;

    const cepWithoutMask = cep.replace(/\D/, "");

    if (cepWithoutMask.length === 8) {
      handleGetAddress(cepWithoutMask);
    }
  }, [cep]);

  return (
    <>
      {isLoading && (<OverlayModal text="Processando... " />)}
      {isScheduledDelivery &&
        <>
          <p>Oferta por: {formatPrice(price / 100)}</p>
          <h3>Atenção: O agendamento sendo finalizado hoje antes do meio dia, o seu produto será enviado hoje ainda. Caso contrário, somente amanhã.</h3>
        </>
      }
      <FormWrapper
        title={title}
        formId="addressData"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="zipCode"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              inputMode="numeric"
              label="CEP"
              placeholder="00000-000"
              onChange={(text) => {
                onChange(cepMask(text.target.value));

                attachTrackLeavingEvents({
                  ...state,
                  addressData: { ...formValues, zipCode: text.target.value },
                });
              }}
              value={value}
              error={errors?.zipCode?.message}
            />
          )}
        />

        <Controller
          name="street"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Endereço"
              placeholder="Rua / Av"
              error={errors?.street?.message}
              maxLength={50}
              value={value}
              onChange={(text) => {
                onChange(text.target.value);

                attachTrackLeavingEvents({
                  ...state,
                  addressData: { ...formValues, street: text.target.value },
                });
              }}
            />
          )}
        />

        <S.FormGroupRow>
          <Controller
            name="number"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                inputMode="numeric"
                label="Número"
                placeholder="Numero"
                error={errors?.number?.message}
                maxLength={5}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Input
            label="Complemento"
            placeholder="Complemento"
            error={errors?.complement?.message}
            maxLength={30}
            {...register("complement")}
          />
        </S.FormGroupRow>

        <Controller
          name="neighborhood"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Bairro"
              placeholder="Bairro"
              error={errors?.neighborhood?.message}
              maxLength={30}
              value={value}
              onChange={(text) => {
                onChange(text.target.value);

                attachTrackLeavingEvents({
                  ...state,
                  addressData: {
                    ...formValues,
                    neighborhood: text.target.value,
                  },
                });
              }}
            />
          )}
        />

        <S.FormGroupRow>
          <Input
            label="Cidade"
            placeholder="Cidade"
            error={errors?.city?.message}
            maxLength={30}
            {...register("city")}
          />
          <Input
            label="Estado"
            placeholder="Estado"
            error={errors?.uf?.message}
            maxLength={30}
            {...register("uf")}
          />
        </S.FormGroupRow>
      </FormWrapper>

      <StepperFooter formId="addressData" spanTitle={stepperFooterSpanTitle} />
    </>
  );
}

export default AddressDataForm;

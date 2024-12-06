import { Controller, useForm } from "react-hook-form";

import { cpfMask, lettersMask, phoneMask } from "../../utils/masks";
import FormWrapper from "../FormWrapper";

import Input from "../Input";
import { useTrackUserLeavingEvents } from "../../hooks/useTrackUserLeavingEvents";
import { UserDataSchema, userDataSchema } from "../../shared/schemas/checkout";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepperFooter } from "../Stepper/partials/Footer";
import { useNavigateToStep } from "../Stepper/useNavigateToStep";
import { useActiveStep } from "../Stepper/useActiveStep";
import { useFormUserPersistedData } from "../../hooks/useFormUserPersistedData";
import { formatTextInLowerCaseAndRemoveSpaces } from "../../utils/text-formats";

type Props = ReturnType<typeof useFormUserPersistedData> & {
  stepperFooterSpanTitle: string;
};

function UserDataForm({ dispatch, state, stepperFooterSpanTitle}: Props) {
  const { getActiveStep } = useActiveStep();
  const { goTo } = useNavigateToStep();

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    control,
  } = useForm<UserDataSchema>({
    resolver: yupResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      name: state.userData.name,
      document: state.userData.document,
      email: state.userData.email,
      phone: state.userData.phone,
      codeArea: "+55",
    },
  });

  const { attachTrackLeavingEvents } = useTrackUserLeavingEvents();
  const formValues = getValues();

  const onSubmit = (data: UserDataSchema) => {
    goTo(getActiveStep() + 1);

    dispatch({ type: "add_user_data", payload: data });
  };

  return (
    <>
      <FormWrapper
        title="Detalhes Pessoais"
        formId="userData"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          defaultValue={""}
          render={({ field: { onChange, ...field } }) => (
            <Input
              label="Nome"
              placeholder="Nome completo"
              className="input_client_name"
              error={errors.name?.message}
              onChange={(text) => {
                onChange(lettersMask(text.target.value));

                attachTrackLeavingEvents({
                  userData: { ...formValues, name: text.target.value },
                });
              }}
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue={""}
          render={({ field: { onChange, ...field } }) => (
            <Input
              label="E-mail"
              className="input_client_email"
              type="email"
              placeholder="E-mail"
              error={errors.email?.message}
              onChange={(text) => {
                onChange(
                  lettersMask(
                    formatTextInLowerCaseAndRemoveSpaces(text.target.value)
                  )
                );

                attachTrackLeavingEvents({
                  userData: { ...formValues, email: text.target.value },
                });
              }}
              {...field}
            />
          )}
        />
        <Controller
          name="document"
          control={control}
          defaultValue={""}
          render={({ field: { onChange, ...field } }) => (
            <Input
              label="CPF"
              inputMode="numeric"
              placeholder="Somente números"
              onChange={(text) => {
                onChange(cpfMask(text.target.value));

                attachTrackLeavingEvents({
                  userData: { ...formValues, document: text.target.value },
                });
              }}
              error={errors.document?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue={""}
          render={({ field: { onChange, ...field } }) => (
            <Input
              label="Celular com DDD"
              inputMode="tel"
              placeholder="00 00000-00000"
              className="input_cel_phone"
              onChange={(text) => {
                onChange(phoneMask(text.target.value));

                attachTrackLeavingEvents({
                  userData: { ...formValues, phone: text.target.value },
                });
              }}
              error={errors.phone?.message}
              prefix="+55"
              maxLength={15}
              {...field}
            />
          )}
        />
      </FormWrapper>

      <StepperFooter formId="userData" spanTitle={stepperFooterSpanTitle} />
    </>
  );
}

export default UserDataForm;

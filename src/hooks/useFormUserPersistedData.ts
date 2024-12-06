import { useEffect, useReducer } from "react";
import { CheckoutSchemaType } from "../shared/schemas/checkout";
import { AddressDataSchema, UserDataSchema } from "../shared/schemas/checkout";
import { useActiveStep } from "../components/Stepper/useActiveStep";
import { useSearchParams } from "react-router-dom";
import { ACTIVE_STEP_KEY } from "../components/Stepper";
import { useProduct } from "./useProduct";

const FORM_STATE = "@360Hub/formState";

export type Actions =
  | { type: "add_user_data"; payload: UserDataSchema }
  | { type: "add_address_data"; payload: AddressDataSchema };

function reducer(
  state: CheckoutSchemaType,
  action: Actions,
): CheckoutSchemaType {
  switch (action.type) {
    case "add_user_data": {
      sessionStorage.setItem(
        FORM_STATE,
        JSON.stringify({ ...state, userData: action.payload }),
      );

      return { ...state, userData: action.payload };
    }
    case "add_address_data": {
      sessionStorage.setItem(
        FORM_STATE,
        JSON.stringify({ ...state, addressData: action.payload }),
      );

      return { ...state, addressData: action.payload };
    }
    default: {
      return state;
    }
  }
}

export function useFormUserPersistedData() {
  const { getActiveStep } = useActiveStep();
  const [searchParams, setSearchParams] = useSearchParams();

  const { offer } = useProduct();

  const activeStep = getActiveStep();

  const [state, dispatch] = useReducer(
    reducer,
    {
      userData: {
        name: "",
        document: "",
        email: "",
        phone: "",
        codeArea: "+55",
      },
      addressData: {
        city: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        uf: "",
        zipCode: "",
      },
    },
    (arg) => {
      try {
        const prev = JSON.parse(
          sessionStorage.getItem(FORM_STATE) ?? "",
        ) as CheckoutSchemaType;

        if (!prev) return arg;

        return prev;
      } catch {
        return arg;
      }
    },
  );

  /**
   * @note This hook probably remove the possibility to refresh the page because the offer woudn't exist at that time, but we'll persist in sessionStorage to solve this
   */
  useEffect(() => {
    if (activeStep !== 1 && (!state?.addressData || !offer)) {
      searchParams.set(ACTIVE_STEP_KEY, "1");
    }

    setSearchParams(searchParams);
  }, [state, offer]);

  return { state, dispatch };
}

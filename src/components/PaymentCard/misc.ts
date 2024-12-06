import * as yup from 'yup'
import { isValidCpf } from '../../shared/schemas/is-valid-cpf';

export const Months = [
  {
    value: "01",
    label: "01",
  },
  {
    value: "02",
    label: "02",
  },
  {
    value: "03",
    label: "03",
  },
  {
    value: "04",
    label: "04",
  },
  {
    value: "05",
    label: "05",
  },
  {
    value: "06",
    label: "06",
  },
  {
    value: "07",
    label: "07",
  },
  {
    value: "08",
    label: "08",
  },
  {
    value: "09",
    label: "09",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "11",
    label: "11",
  },
  {
    value: "12",
    label: "12",
  },
];
const getYears = () => {
  const years = [];
  // TODO: improve this function
  for (let i = 2022; i <= 2080; i++) {
    years.push(i.toString());
  }
  return years;
};
export const YearOptions = getYears().map((year) => {
  return {
    value: year,
    label: year,
  };
});
export type CreditCardFormSchema = {
  cardNumber: string;
  cardHolder: string;
  cardDocument: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  installments: number;
};

export const creditCardSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required("Informe o número do cartão"),
  cardHolder: yup.string().required("Informe o nome do titular"),
  cardDocument: yup
    .string()
    .test({ ...isValidCpf })
    .required("Informe o documento do titular"),
  expiryMonth: yup.string().required("Informe o mês de expiração"),
  expiryYear: yup.string().required("Informe o nome de expiração"),
  cvv: yup
    .string()
    .required("Informe o código de segurança")
    .min(3, "Informe os 3 digitos")
    .test("number", "Deve conter ao menos um número", (value) => {
      const regexNumberOnly = /^\d+$/;

      if (!regexNumberOnly.test(value!)) return false;
      return true;
    }),
  installments: yup
    .number()
    .min(1)
    .required("Informe a quantidade de parcelas"),
});

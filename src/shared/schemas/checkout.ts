import * as yup from "yup";
import { isValidCpf } from "./is-valid-cpf";

export const CheckoutSchema = yup
  .object()
  .shape({
    userData: yup.object().shape({
      name: yup
        .string()
        .test("name", (value, context) => {
          if (
            value &&
            value.split(" ").filter((item) => item != "").length < 2
          ) {
            return context.createError({
              message: "Informe ao menos um sobrenome",
            });
          }

          return true;
        })
        .required("Informe o nome completo"),
      document: yup
        .string()
        .test({ ...isValidCpf })
        .required("Informe o CPF"),
      email: yup
        .string()
        .email("Forneça um e-mail válido")
        .required("Informe um e-mail"),
      phone: yup
        .string()
        .required("Informe um número de celular")
        .min(15, "Informe seu telefone completo"),
      codeArea: yup.string().required("Informe o código de área"),
    }),
    addressData: yup.object().shape({
      city: yup.string().required("Informe a cidade"),
      zipCode: yup
        .string()
        .length(9, "O CEP deve conter 9 caracteres")
        .required("Informe o cep"),
      street: yup
        .string()
        .required("Informe o endereço")
        .max(50, "A quantidade máxima de caracteres é 50."),
      number: yup
        .string()
        .max(5, "A quantidade máxima de caracteres é 5.")
        .required("Informe o número"),
      complement: yup
        .string()
        .max(30, "A quantidade máxima de caracteres é 30."),
      neighborhood: yup
        .string()
        .required("Informe o bairro")
        .max(30, "A quantidade máxima de caracteres é 30."),
      uf: yup
        .string()
        .min(2, "Mínimo 2 caracteres")
        .max(2, "Máximo 2 caracteres")
        .required("Informe a UF"),
    }),
  })
  .required();

export const userDataSchema = yup.object().shape({
  name: yup
    .string()
    .test("name", (value, context) => {
      if (value && value.split(" ").filter((item) => item != "").length < 2) {
        return context.createError({
          message: "Informe ao menos um sobrenome",
        });
      }

      return true;
    })
    .required("Informe o nome completo"),
  document: yup
    .string()
    .test({ ...isValidCpf })
    .required("Informe o CPF"),
  email: yup
    .string()
    .email("Forneça um e-mail válido")
    .required("Informe um e-mail"),
  phone: yup
    .string()
    .required("Informe um número de celular")
    .min(15, "Informe seu telefone completo"),
  codeArea: yup.string().required("Informe o código de área"),
});

export const addressDataSchema = yup.object().shape({
  city: yup.string().required("Informe a cidade"),
  zipCode: yup
    .string()
    .length(9, "O CEP deve conter 9 caracteres")
    .required("Informe o cep"),
  street: yup
    .string()
    .required("Informe o endereço")
    .max(50, "A quantidade mxima de caracteres é 50."),
  number: yup
    .string()
    .max(5, "A quantidade máxima de caracteres é 5.")
    .required("Informe o número"),
  complement: yup.string().max(30, "A quantidade máxima de caracteres é 30."),
  neighborhood: yup
    .string()
    .required("Informe o bairro")
    .max(30, "A quantidade máxima de caracteres é 30."),
  uf: yup
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(2, "Máximo 2 caracteres")
    .required("Informe a UF"),
});

export type CheckoutSchemaType = yup.InferType<typeof CheckoutSchema>;
export type UserDataSchema = yup.InferType<typeof userDataSchema>;
export type AddressDataSchema = yup.InferType<typeof addressDataSchema>;

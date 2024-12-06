import { Step } from "../../components/Stepper";

export function useGetCheckoutSteps(productIsPhysical: boolean | undefined): Step[] {
  return [
    {
      aria_label: "Detalhes Pessoais",
    },
    ...(productIsPhysical ? [{ aria_label: "Endereço de entrega" }] : []),
    {
      aria_label: "Dados de pagamento",
    },
  ]
}

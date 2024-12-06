import { Step } from "../../components/Stepper";

export function useGetDeliverySteps(productIsPhysical: boolean | undefined): Step[] {
  return [
    {
      aria_label: "Detalhes Pessoais",
    },
    ...(productIsPhysical ? [{ aria_label: "Endereço de entrega" }] : [])
  ]
}

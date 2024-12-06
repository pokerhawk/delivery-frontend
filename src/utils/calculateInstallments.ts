import formatPrice from "./format-price";

type SelectReturn = {
  value: string,
  label: string,
}

type TInstallmentsTax = {
  totalWithTaxes: number;
}

type TInstallmentDTO = {
  total?: number;
  installments?: number;
  installmentsFreeInterest?: number;
  installmentInterest?: number;
}

type TCalculateInstallmentTax = {
  installment: number;
  total: number;
  installmentInterest: number;
  rounded?: boolean;
}

type TCalculateTotalPriceDTO = {
  installmentsFreeInterest: number;
  installmentInterest: number;
  installment: number;
  total: number;
  rounded?: boolean;
}

export function calculateInstallmentsTax({
  installment,
  total,
  installmentInterest,
  rounded = false,
}: TCalculateInstallmentTax): number {
  const installmentPrice = total / installment;
  const tax = total * (installmentInterest / 100);
  let value = installmentPrice + tax;

  return Math.round(value * 100) / 100;
}

export function calculateInstallmentTax({
  installment,
  total,
  installmentInterest,
  rounded = false,
}: TCalculateInstallmentTax): number {
  const tax = total * (installmentInterest / 100);

  return Math.round(tax);
}

export default function calculateInstallments({
  total = 0,
  installments = 0,
  installmentsFreeInterest = 0,
  installmentInterest = 0,
}: TInstallmentDTO): SelectReturn[] {
  const value = Array.from({ length: installments }, (_, index) => {
    const formattedTotal = total / 100;
    const installment = index + 1;

    if (index === 0) {
      return {
        value: String(installment),
        label: `${installment}x de ${formatPrice(formattedTotal)}`,
      };
    } else {
      const installmentPrice = total / installment;
      let label = '';

      if (installment <= installmentsFreeInterest) {
        label =
          `${installment}x de ${formatPrice(installmentPrice / 100)} SEM JUROS`;
      } else {
        label = `${installment}x de ${formatPrice(calculateInstallmentsTax({
          installment,
          installmentInterest,
          total: formattedTotal,
        }))} COM JUROS ${formatPrice(calculateInstallmentTax({
          installment,
          installmentInterest,
          total: formattedTotal,
        }))}`;
      }

      return {
        value: String(installment),
        label,
      }
    }
  });

  return value;
}

export function calculateTotalPrice({
  installment,
  total,
  installmentsFreeInterest,
  installmentInterest,
  rounded = false,
}: TCalculateTotalPriceDTO) {
  if (installment > installmentsFreeInterest) {
    const priceWithTax = calculateInstallmentsTax({
      total,
      installment,
      installmentInterest,
      rounded,
    });

    return (Math.round(priceWithTax * 100) / 100) * installment;
  }

  return total;
}

export function calculateInterestInstallments(total: number, installments: number, interestTax: number): TInstallmentsTax {
  const taxesTotal = (total * (interestTax / 100)) * installments;
  const totalWithTaxes = total + taxesTotal;

  return { totalWithTaxes };
}

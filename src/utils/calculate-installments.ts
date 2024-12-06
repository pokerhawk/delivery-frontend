import formatPrice from "./format-price";

const TAX_PERCENTAGE = 2.99;
const BUYER_INTEREST_TAX = 1.4175;

function divideIntoInstallments(value: number, installments: number): number {
  return value / installments;
}

function generateArrayValue(value: number, installments: number): number[] {
  const array = [];

  for (let index = 0; index < installments; index++) {
    array.push(value);
  }

  return array;
}

function sumValuesArray(values: number[]): number {
  return values.reduce((x, y) => x + y);
}

function getDifferenceInTwoValues(a: number, b: number): number {
  return Math.abs(a - b);
}

function redistributeRemainderInInstallments(
  diff: number,
  values: number[]
): number[] {
  let valuesArray = [...values];

  for (let index = diff; index > 0; index--) {
    valuesArray[diff - index] += 1;
  }

  return valuesArray;
}

type BreakValueInInstallmentsParams = {
  value: number;
  installments: number;
};

export function breakValueInInstallments({
  value,
  installments,
}: BreakValueInInstallmentsParams): number[] {
  const price = divideIntoInstallments(value, installments);

  const values = generateArrayValue(price, installments);

  const sumArrayValues = sumValuesArray(values);

  if (sumArrayValues === value) return values;

  // Verifica se possui valor restante
  const diff = getDifferenceInTwoValues(sumArrayValues, value);

  return redistributeRemainderInInstallments(diff, values);
}

type CalculateInstallmentsTax = {
  total: number;
  installmentInterest: number;
  installmentPrice: number;
};

function calculateInstallmentsTax({
  total,
  installmentInterest,
  installmentPrice,
}: CalculateInstallmentsTax): number {
  const tax = total * (installmentInterest / 100);
  let value = installmentPrice + tax;

  return Math.round(value * 100) / 100;
}

type NearestValueParams = {
  total: number;
  installmentsPrices: number[];
};

function nearestValue({ total, installmentsPrices }: NearestValueParams) {
  const max = Math.max(...installmentsPrices);
  const min = Math.min(...installmentsPrices);

  const maxmin = [max, min];

  const difference = maxmin.map((value) => {
    return Math.abs(total - value * installmentsPrices.length);
  });

  const nearestValueDiff = Math.min(...difference);

  const nearestValueIndex = difference.indexOf(nearestValueDiff);

  return installmentsPrices[nearestValueIndex];
}

type CreateInstallmentsParams = {
  total: number;
  installments: number;
  interestTax: number;
  typeInterestSale: "InCash" | "ProducerInterest" | "BuyerInterest";
};

export const createInstallments = ({
  total,
  installments,
  interestTax,
  typeInterestSale,
  // shippingPrice,
}: CreateInstallmentsParams) => {
  const installmentsArray = Array.from({ length: installments }, (_, index) => {
    const installment = index + 1;
    const isFisrtInstallment = installment === 1;
    const isBuyerInterest = typeInterestSale === "BuyerInterest";

    let value = total;

    if (!isFisrtInstallment && isBuyerInterest) {
      value = total + total * (TAX_PERCENTAGE / 100);
    }

    const installmentsPrices = breakValueInInstallments({
      installments: installment,
      value,
    });

    const installmentNearestValue = nearestValue({
      total,
      installmentsPrices,
    });

    const installmentInterest = installment !== 1 ? interestTax : 0;

    const installmentPrice = calculateInstallmentsTax({
      total,
      installmentInterest,
      installmentPrice: installmentNearestValue,
    });

    const warnning = installmentInterest > 0 ? "*" : "";

    return {
      value: String(installment),
      price: installmentPrice,
      label: `${installment}x de ${formatPrice(
        installmentPrice / 100
      )}${warnning}`,
      installmentInterest: installment * installmentPrice - total,
    };
  });

  return installmentsArray;
};

export const TAX = {
  InCash: 0,
  ProducerInterest: 0,
  BuyerInterest: BUYER_INTEREST_TAX,
};

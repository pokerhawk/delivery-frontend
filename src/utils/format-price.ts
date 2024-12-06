export default function formatPrice(
  price: number | bigint | undefined = 0,
  split = false
): string {
  const value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price || 0)

  if (split) return value.split('\u00A0')[1]

  return value
}

export function calculatePixDiscount(total: number, discount: number): number {
  const formattedDiscount = discount / 100;
  const priceWithDiscount = total * formattedDiscount;

  return priceWithDiscount;
}

export function formatPriceCents(
  price: number | undefined = 0,
  split = false
): string {
  const toFormat = price / 100;

  const value = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(toFormat)

  if (split) return value.split('\u00A0')[1]

  return value
}

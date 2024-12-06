type Action = 'PageView' | 'InitiateCheckout' | 'Purchase' | 'AddPayInfo';

export const FPIXEL_ID = 'fpixel'

export function getPixelsIds() {
  if (typeof window === 'undefined') return []

  const storagePixels = JSON.parse(sessionStorage.getItem(FPIXEL_ID) || '[]') as string[]

  if (storagePixels?.length) {
    return storagePixels
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const pixels = [...new Set(urlParams.getAll('fpixel'))]

  if (!pixels || pixels.length === 0) return []

  sessionStorage.setItem(FPIXEL_ID, JSON.stringify(pixels));

  return pixels
}


export function trackSingle(pixels: string[], action: Action, opts?: unknown) {
  if (typeof window === 'undefined') return

  for (const pixel of pixels) {
    window.fbq('trackSingle', pixel, action, opts)
  }
}


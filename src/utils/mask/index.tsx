export const cpfMask = (value: string) => {
  return value
    .toString()
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const maskCnpj = (cnpj: string): string => {
  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj.length !== 14) {
    return cnpj
  }

  return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
    5,
    8
  )}/${cnpj.slice(8, 12)}-${cnpj.slice(12, 14)}`
}

export const maskPhone = (phone: string): string => {
  phone = phone.replace(/\D/g, '')

  if (phone.length > 11) {
    phone = phone.slice(0, 11)
  }

  if (phone.length === 11) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(
      3,
      7
    )}-${phone.slice(7)}`
  }

  if (phone.length === 10) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`
  }

  if (phone.length === 9) {
    return `${phone.slice(0, 1)} ${phone.slice(1, 5)}-${phone.slice(5)}`
  }

  return phone
}

export const formatBrazilCEP = (cep: string): string => {
  if (!cep) return ''

  const cepRegex = /^(\d{5})[-]?(\d{3})$/
  const match = cep.match(cepRegex)
  if (match) {
    return `${match[1]}-${match[2]}`
  } else {
    return cep
  }
}

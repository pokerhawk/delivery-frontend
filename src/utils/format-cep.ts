const formatCep = (cep?: string) => {
  if (!cep) return ''
  const cepFormat = /^([\d]{5})-?([\d]{3})/
  const notNumber = /\D/g
  return cep.replaceAll(notNumber, '').replace(cepFormat, '$1-$2') // replace is everything not number, apply cep format
}

export default formatCep

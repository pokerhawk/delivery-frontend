const formatValidity = (value = '') => {
  const cepFormat = /^([\d]{2})([\d]{2})/
  const notNumber = /\D/g
  return value.replaceAll(notNumber, '').replace(cepFormat, '$1/$2') // replace is everything not number, apply cep format
}

export const formatValidityWithFourNumberAfterSlash = (value = '') => {
  const cepFormat = /^([\d]{2})([\d]{4})/
  const notNumber = /\D/g
  return value.replaceAll(notNumber, '').replace(cepFormat, '$1/$2') // replace is everything not number, apply cep format
}

export default formatValidity

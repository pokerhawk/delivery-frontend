const formatBornDate = (bornDate?: string) => {
  if (!bornDate) return ''
  const bornDateFormat = /^([\d]{2})([\d]{2})([\d]{4})/
  const notNumber = /\D/g
  return bornDate
    .replaceAll(notNumber, '') // replace everything is not number
    .replace(bornDateFormat, '$1/$2/$3') // apply born date format
}

export default formatBornDate

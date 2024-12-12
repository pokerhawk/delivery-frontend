type Types = 'onlyNumber'

export const removeMask = (value = '', type: Types) => {
  switch (type) {
    case 'onlyNumber':
      return value.replace(/\D/g, '')
    default:
      return value
  }
}

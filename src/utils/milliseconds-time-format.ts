const millisecondsTimeFormat = (milliseconds: number) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

  const secondsToString = String(seconds).length === 1 ? `0${seconds}` : seconds
  const minutesToString = minutes ? `${minutes}:` : ''

  return `${minutesToString}${minutesToString ? secondsToString : `${secondsToString}s`}`
}

export default millisecondsTimeFormat

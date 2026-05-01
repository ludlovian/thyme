const DT_RX = /^\d\d\d\d-\d\d-\d\d[T ]\d\d:\d\d:\d\d(?:\.\d\d\d)?Z?$/
export default function convert (str) {
  const len = str?.length
  if (
    str &&
    typeof str === 'string' &&
    len >= 19 &&
    len <= 24 &&
    DT_RX.test(str)
  ) {
    return new Date(str.endsWith('Z') ? str : str + 'Z')
  }
  return str
}

export function jsonParse (str) {
  return JSON.parse(str, jsonReviver)
}

export function jsonReviver (key, value) {
  return typeof value === 'string' ? convert(value) : value
}

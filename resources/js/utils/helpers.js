export default function isEmptyObject(input) {
  return Object.keys(input).length < 1 ? true : false
}
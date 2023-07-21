export const dateTransform = (originalDate) => {
  const date = new Date(originalDate)
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }
  const formattedDate = new Intl.DateTimeFormat('es-MX', options).format(date)
  return formattedDate
}

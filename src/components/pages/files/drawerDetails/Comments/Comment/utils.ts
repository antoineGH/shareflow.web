export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const formattedDate = `${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })} - ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`

  return formattedDate
}

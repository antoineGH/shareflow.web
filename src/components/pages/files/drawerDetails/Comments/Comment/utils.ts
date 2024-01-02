export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)} - ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  return formattedDate
}

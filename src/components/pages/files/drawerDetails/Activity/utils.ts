export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))

  if (diffHours < 1) return 'Last hour'
  if (diffHours < 24) return 'Today'

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Yesterday'

  const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)} - ${String(
    date.getHours(),
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  return formattedDate
}

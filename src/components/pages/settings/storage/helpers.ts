type Props = {
  storageUsed: number
  totalStorage: number
}

function calculateStoragePercentage({
  storageUsed,
  totalStorage,
}: Props): number {
  return Math.round((storageUsed / totalStorage) * 100)
}

export { calculateStoragePercentage }

function defineAvatarInitials(name: string): string {
  if (name === 'undefined') {
    return 'UN'
  }
  const nameArray = name.split(' ')
  if (nameArray.length > 1) {
    return nameArray[0][0] + nameArray[1][0]
  }
  return nameArray[0][0]
}

export { defineAvatarInitials }

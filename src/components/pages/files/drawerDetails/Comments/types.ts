export type Comment = {
  id: string
  comment: string
  createdAt: string
  user: {
    id: string
    name: string
  }
}

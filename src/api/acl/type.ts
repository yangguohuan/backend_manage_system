export interface ACL {
  id: number
  label: string
  children: Array<ACL>
  tag?: string
  level: number
  select: boolean
}

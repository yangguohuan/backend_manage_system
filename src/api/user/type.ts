export interface loginForm {
  username: string
  password: string
}

export interface user {
  id?: number
  username?: string
  nickname?: string
  password?: string
  role?: string
  roles?: Array<role>
  acls?: Array<string>
  date_added?: string
  date_updated?: string
}

export interface role {
  id: number
  userId: number
  rolename: string
  date_added: string
  date_updated: string
}

export interface token {
  token: string
}

export interface ROUTE {
  path?: string
  component?: string
  name?: string
  meta?: object
  redirect?: string
  children?: Array<ROUTE>
}

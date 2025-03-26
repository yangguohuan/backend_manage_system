export interface loginForm {
  username: string
  password: string
}

export interface user {
  username: string
  email: string
  user_type: number
  signature: string
  date_added: string
}

export interface token {
  token: string
}

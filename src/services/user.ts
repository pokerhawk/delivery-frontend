import api from './axios'

export type User = {
  birthDate: string
  cpf: string
  createdAt: string
  deletedAt?: string
  documentRG: string
  name: string
  id: string
  nacionality: string
  secondaryPhone: string
  updatedAt: string
  userId: string
}

export const getUser = async (id: string) => {
  const { data } = await api.get<User[]>(`/user`)

  const user = data[0]

  return user
}

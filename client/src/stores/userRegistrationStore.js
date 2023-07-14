import { create } from 'zustand'

export const useUserRegistrationStore = create((set) => {
  return {
    name: '',
    email: '',
    password: '',
    loading: false,
    errorMsg: '',
    setName: (name) => set({ name }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setLoading: (loading) => set({ loading })
  }
})

import { create } from 'zustand'

export const useUserStore = create((set) => ({
  name: '',
  email: '',
  password: '',
  loading: false,
  errorMsg: '',
  registerResponse: null,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setLoading: (loading) => set({ loading }),
  setErrorMsg: (errorMsg) => set({ errorMsg })
}))

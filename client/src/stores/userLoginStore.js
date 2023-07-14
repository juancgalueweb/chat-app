import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserLoginStore = create(
  persist(
    (set) => {
      return {
        email: '',
        password: '',
        loading: false,
        user: {
          _id: '',
          name: '',
          email: '',
          token: ''
        },
        setEmail: (email) => set({ email }),
        setPassword: (password) => set({ password }),
        setUser: (userData) => set({ user: userData }, 'USER_DATA'),
        setLoading: (loading) => set({ loading })
      }
    },
    { partialize: (state) => ({ user: state.user }), name: 'user-logged-in' }
  )
)

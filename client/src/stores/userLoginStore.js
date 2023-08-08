import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  email: '',
  password: '',
  loading: false,
  user: {
    _id: '',
    name: '',
    email: ''
  }
}

const localStorageKey = 'user-logged-in'

export const useUserLoginStore = create(
  persist(
    (set) => ({
      ...initialState,
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setUser: (userData) => set({ user: userData }),
      setLoading: (loading) => set({ loading }),
      resetUser: () => {
        set({ user: initialState.user })
        localStorage.removeItem(localStorageKey)
      }
    }),
    {
      name: `${localStorageKey}`,
      partialize: (state) => ({ user: state.user })
    }
  )
)

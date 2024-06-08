'use client'
import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react'
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { User } from '@/interface/users'

interface AuthContextType {
  currentUser: User | null
  userLoggedIn: boolean
  loading: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const auth = getAuth()  // Get the auth instance from Firebase
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return () => unsubscribe() // Cleanup subscription on unmount
  }, [])

  async function initializeUser(user: FirebaseUser | null): Promise<void> {
    if (user) {
      const userData: User = {
        id: user.uid,
        name: user.displayName || '',
        surname: '',
        email: user.email || '',
        mobile: '',
        role: '',
        company: '',
        jobTitle: '',
        password: null,
        createdAt: new Date(user.metadata.creationTime || Date.now()) as any,
        updatedAt: new Date(user.metadata.lastSignInTime || Date.now()) as any,
      }
      setCurrentUser(userData)
      setUserLoggedIn(true)
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
    }
    setLoading(false)
  }

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
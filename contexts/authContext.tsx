'use client'
import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react'
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { User } from '@/interface/users'
import { db } from '@/firebase/config'
import { getDocs, collection, query, where } from 'firebase/firestore'

interface AuthContextType {
  currentUser: User | null
  userLoggedIn: boolean
  loading: boolean
  isClient: boolean
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
  const [isClient, setIsClient] = useState<boolean>(true)

  useEffect(() => {
    const auth = getAuth()  // Get the auth instance from Firebase
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return () => unsubscribe() // Cleanup subscription on unmount
  }, [])

  async function initializeUser(user: FirebaseUser | null): Promise<void> {
    if (user) {
      const q = query(collection(db, 'users'), where("authId", "==", user.uid))
      const querySnapshot = await getDocs(q)
      let userData: User | null = null
      let userRole: boolean | null = null

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        userData = {
          id: doc.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          mobile: data.mobile,
          role: data.role,
          company: data.company,
          jobTitle: data.jobTitle,
          password: data.password,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          authId: data.authId
        }
        userRole = data.role
      })
      setCurrentUser(userData)
      setUserLoggedIn(true)
      if(userRole){
        const role = userRole==="CLIENT"? true: false
        setIsClient(role)
      }
      
    } else {
      setCurrentUser(null)
      setUserLoggedIn(false)
    }
    setLoading(false)
  }

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    loading,
    isClient,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
import { auth } from '@/app/firebase/config'
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, sendPasswordResetEmail, 
  signInWithEmailAndPassword, updatePassword, UserCredential } from 'firebase/auth'

export const doCreateUserWithEmailAndPassword = async(email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = async(email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const doSignOut = () => {
  return auth.signOut()
}

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email)
// }

// export const doPasswordChange = ()=> {
//   return updatePassword(auth.currentUser, password)
// }

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/`
//   })
// }
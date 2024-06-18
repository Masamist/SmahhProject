import { db } from '@/firebase/config'
import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore'
import { User } from '@/interface/users'

export async function fetchUserDataByGroup(page: string): Promise<User[]>{
  let q
  let querySnapshot
  if(page==='AGENT'){
    q = query(collection(db, "users"), where("role", "==", "AGENT"))
  }else{
    q = query(collection(db, "users"), where("role", "==", "CLIENT"))
  }
  querySnapshot = await getDocs(q)
  const users: User[] = []
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...(doc.data() as Omit<User, 'id'>) })
  })
  return users
}

export async function fetchSingleUserData(id: string): Promise<User | null>{
  const docSnap = await getDoc(doc(db, "users", id))
  if (docSnap.exists()) {
    const userData = { id: docSnap.id, ...docSnap.data() } as User
    return userData
  }else{
    console.log(`Document with ID ${id} does not exist`)
    return null
  }
}

// export async function fetchSingleUserId(uid: string): Promise <{id:string} | null>{
//   const q = query(collection(db, "user"), where("uid", "==", uid))
//   const docSnap = await getDoc(q)
//   if (docSnap.exists()) {
//     const userData = { id: docSnap.id, ...docSnap.data() } as User
//     return { id:userData.id }
//   } else {
//     console.log(`Document with ID ${uid} does not exist`)
//     return null
//   }
// }

// export async function fetchSingleUserData(uid: string): Promise<User | null>{
//   const user = await fetchSingleUserId(uid)
//   if(user){
//     const docSnap = await getDoc(doc(db, "users", user.id))
//     if (docSnap.exists()) {
//       const userData = { id: docSnap.id, ...docSnap.data() } as User
//       return userData
//     } else {
//       console.log(`Document with ID ${user.id} does not exist`)
//       return null
//     }
//   }else{
//     console.log(`Document with ID ${uid} does not exist`)
//     return null
//   }
// }


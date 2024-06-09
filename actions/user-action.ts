import { db } from '@/firebase/config'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { User } from '@/interface/users'

export async function fetchUserDataByGroup(page: string): Promise<User[]>{
  let q
  let querySnapshot
  if(page==='STAFF'){
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
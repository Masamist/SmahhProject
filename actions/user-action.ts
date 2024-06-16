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

export async function fetchSingleUserId(uid: string){
  const docSnap = await getDoc(doc(db, "users", uid))
  if (docSnap.exists()) {
    const userData = { id: docSnap.id, ...docSnap.data() } as User
    return userData
  } else {
  }
}

export async function fetchSingleUserData(userData: User){
  const docSnap = await getDoc(doc(db, "users", userData.id))
  if (docSnap.exists()) {
    const userData = { id: docSnap.id, ...docSnap.data() } as User
    return userData
  } else {
    console.log(`Document with ID ${userData.id} does not exist`)
  }
}

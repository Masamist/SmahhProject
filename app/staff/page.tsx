import Link from 'next/link'
import React from 'react'
import { collection, getDocs } from "firebase/firestore"
import { db } from '@/firebaseConfig'

const page = async() => {
  const querySnapshot = await getDocs(collection(db, "tickets"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().title}`);
  })

  return (
    <div>
      <h1>Staff Page</h1>
      <Link href='/staff/create/'>form</Link>
    </div>
  )
}

export default page
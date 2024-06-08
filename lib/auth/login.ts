import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface Props {
  email: string;
  password: string;
}

export const login = ({ email, password }: Props ) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
}

import { getAuth, createUserWithEmailAndPassword, UserCredential, AuthError } from "firebase/auth"

interface SignUpProps {
  email: string;
  password: string;
}


export const SignUp = async ({ email, password }: SignUpProps): Promise<{ uid: string } | null> => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { uid: user.uid };
  } catch (error) {
    console.error("Error signing up:", error);
    return null;
  }
};

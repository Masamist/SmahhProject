// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/contexts/authContext'
import Image from 'next/image'
import SmahhLogo from '@/assets/smahhLoginLogo.png'
import LoginForm from './LoginForm'


const Login = () => {
  // const { userLoggedIn } = useAuth()
  // const router = useRouter()
  return (
    <>
      {/* {userLoggedIn && (router.replace('/'))} */}
      <main className="absolute bg-gray-600 z-50 w-screen h-screen flex items-center justify-center md:h-auto">
        <div className="flex flex-col w-full max-w-[450px] justify-center 
        rounded-lg bg-white px-20 pt-5 pb-20 border border-gray-300 shadow">
          <div className="flex justify-center py-16">
            <Image src={SmahhLogo} alt='Smahh Logo' width={200} height={80} />
          </div>
          <h3 className='text-2xl text-center pb-5'>System Login</h3>
          <LoginForm />
        </div>
      </main>
    </> 
  )
}

export default Login
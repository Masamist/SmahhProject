import Image from 'next/image'
import SmahhLogo from '@/assets/smahhLoginLogo.png'
import LoginForm from '@/components/LoginForm'


const Login = () => {
  return (
    <>
      <main>
        <div className="flex flex-col w-full justify-center 
        rounded-lg bg-white px-20 pt-5 pb-20 border border-gray-300 shadow">
          <div className="flex justify-center px-8 py-16">
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
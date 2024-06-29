import { getTokens } from "next-firebase-auth-edge"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import MainTitle from '@/components/MainTitle'
import { clientConfig, serverConfig } from "@/config";
import DashboardLayout from "@/components/dashboard/DashboardLayout";


export default async function Dashboard(){
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    notFound();
  }
  return (
    <main className='container max-w-screen-lg'>
      <MainTitle title='Dashboard' />
      <DashboardLayout />
    </main>
  )
}

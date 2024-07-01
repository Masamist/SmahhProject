import type { Metadata } from "next";
import { Inter } from "next/font/google"
// UI materials
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Sidebar from "@/components/nav/Sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/authContext"
import { ProtectedLayout } from '@/components/protectedLayout'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smahh Ticketing System",
  description: "Smahh Cybersecurity is dedicated to protecting organizations of all sizes from evolving cyber threats. Founded by seasoned professionals, we offer comprehensive services including vulnerability assessments, penetration testing, threat intelligence, and incident response. Our customized security solutions and proactive approach ensure the integrity, confidentiality, and availability of critical data. By partnering with clients to develop tailored strategies and foster security awareness, Smahh helps businesses stay ahead of threats and minimize the impact of incidents. Choose Smahh Cybersecurity to safeguard your digital assets and build a secure future.",
  icons:{
    icon: '/ico.png'
  }
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }){
  
  return (
    <html lang="en"  suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedLayout>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Nav />
              <div>
                <Sidebar />
                <main className="pt-16 pb-10 md:pt-[100px] md:pl-[170px] lg:pl-[250px] 
                  min-h-screen bg-gray-200">
                    <div className="container max-w-screen-xl">
                      {children}
                    </div>
                </main>
              </div>
            </ThemeProvider>
          </ProtectedLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

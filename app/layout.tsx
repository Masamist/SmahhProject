import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smahh Website and Ticket Applicaiton",
  description: "Generated by Masami",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }){
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav>
              <Nav />
          </nav>
          <div>
            <Sidebar />
            <main className="pt-16 md:pt-[100px] md:pl-[170px] lg:pl-[250px] h-screen bg-gray-100">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { NextResponse, NextRequest } from "next/server";
//import { cookies } from "next/headers"
// import {auth} from '@/firebase/config' // This does not work
import { useAuth } from '@/contexts/authContext'

// const loggedInRoutes = ["/"];
// const loggedOutRoutes = ["/login"];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {

  //const { currentUser } = useAuth()
  const currentUser = false
  
  if(!currentUser){
    return NextResponse.redirect(
        new URL('/login', req.url)
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher:['/', '/tickets', '/agents', '/clients',  '/profile']
}

  // if (
  //   !loggedInRoutes.some((path) =>
  //     req.nextUrl.pathname.startsWith(path)) &&
  //   !loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  // ) {
  //   return NextResponse.next();
  // } else {
  //   const myCookie = cookies()
  //   console.log('test:', myCookie.get("Token"))

  //   let token: string | null = null;
  //   if (myCookie.get("token")) {
  //     token = myCookie.get("token")!.value;
  //   }

  //   if (
  //     !token &&
  //     loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  //   ) {
  //     return NextResponse.redirect("http://localhost:3000/login");
  //     return NextResponse.redirect(
  //       new URL('/login', req.url)
  //     );
  //   } else if (
  //     token &&
  //     loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  //   ) {
  //     return NextResponse.redirect(
  //       new URL('/', req.url)
  //     );
  //   }
  // }
  // return NextResponse.next();


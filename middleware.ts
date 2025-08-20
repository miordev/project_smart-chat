import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/chat"];
const publicRoutes = ["/"];

const isAuthenticated = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);
  return Boolean(session?.username);
};

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const loggedIn = await isAuthenticated();

  // Redirect to login if the user is not authenticated
  if (isProtectedRoute && !loggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect to /chat if the user is authenticated
  if (isPublicRoute && loggedIn) {
    return NextResponse.redirect(new URL("/chat", req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

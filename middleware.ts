import { NextResponse, type NextRequest } from "next/server";
import { JwtPayload } from "./utils/jwtPayload";
import { jwtVerify } from "jose";

export async function isValidToken(
  token: string,
  secret: string
): Promise<boolean> {
  try {
    const { payload } = (await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    )) as { payload: JwtPayload };

    const isNotExpired = payload.exp * 1000 > Date.now();
    const hasUsername = payload.username !== undefined;

    return hasUsername && isNotExpired;
  } catch (e) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const secret = process.env.JWT_SECRET as string;
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("access_token")?.value || "";
  const baseUrl = request.nextUrl.origin;

  const isValidTokens = await isValidToken(token, secret);

  if (!isValidTokens && path !== "/") {
    return NextResponse.redirect(`${baseUrl}/`); // URL absolue
  }

  if (isValidTokens && path === "/") {
    return NextResponse.redirect(`${baseUrl}/dashboard/home`); // URL absolue
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/home"],
};

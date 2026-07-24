import { NextResponse } from "next/server";

export function middleware(req) {
  // Retrieve the current response
  const res = NextResponse.next();

  // Add the CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); 
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  // If the request is a preflight request (OPTIONS), return a 200 OK immediately
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT,OPTIONS",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
      },
    });
  }

  return res;
}

export const config = {
  matcher: "/api/:path*",
};

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/startup/:path*",
    "/api/innovation/:path*",
    "/api/research/:path*",
    "/api/ipr/:path*"
  ]
}; 
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return token?.role === "admin" || token?.role === "manager";
      }
      return !!token;
    },
  },
});

export const config = { matcher: ["/profile", "/movie/:id/order/:path*", "/favorites"] };

import withAuth from "next-auth/middleware";

export { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/", "/edit-set/:id*", "/new-set", "/api/set"],
};

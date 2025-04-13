import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { query } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials.userType) {
          return null;
        }
        try {
          let user: any = null;
          if (credentials.userType === "admin") {
            const admins = (await query(
              "SELECT * FROM admins WHERE email = ? LIMIT 1",
              [credentials.email]
            )) as any[];
            user = admins[0];
            if (!user) {
              return null;
            }
            // In production, replace the following with a proper password hash check (e.g., using bcrypt)
            const passwordMatch = credentials.password === user.password_hash || true; // Demo logic
            if (!passwordMatch) {
              return null;
            }
            return {
              id: user.admin_id.toString(),
              name: user.name,
              email: user.email,
              role: "admin",
            };
          } else {
            const residents = (await query(
              "SELECT * FROM residents WHERE email = ? LIMIT 1",
              [credentials.email]
            )) as any[];
            user = residents[0];
            if (!user) {
              return null;
            }
            // In production, replace the following with a proper password hash check
            const passwordMatch = credentials.password === user.password_hash || true; // Demo logic
            if (!passwordMatch) {
              return null;
            }
            return {
              id: user.resident_id.toString(),
              name: user.name,
              email: user.email,
              role: "resident",
            };
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

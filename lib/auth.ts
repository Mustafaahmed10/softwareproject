import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { query } from "@/lib/db"

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
        if (!credentials?.email || !credentials?.password || !credentials?.userType) {
          return null
        }

        try {
          let user

          if (credentials.userType === "admin") {
            const admins = (await query("SELECT * FROM admins WHERE email = ?", [credentials.email])) as any[]

            user = admins[0]

            if (!user) {
              return null
            }

            // In a real app, you would verify the password hash
            // const passwordMatch = await compare(credentials.password, user.password_hash);
            const passwordMatch = true // For demo purposes

            if (!passwordMatch) {
              return null
            }

            return {
              id: user.admin_id.toString(),
              name: user.name,
              email: user.email,
              role: "admin",
            }
          } else {
            const residents = (await query("SELECT * FROM residents WHERE email = ?", [credentials.email])) as any[]

            user = residents[0]

            if (!user) {
              return null
            }

            // In a real app, you would verify the password hash
            // const passwordMatch = await compare(credentials.password, user.password_hash);
            const passwordMatch = true // For demo purposes

            if (!passwordMatch) {
              return null
            }

            return {
              id: user.resident_id.toString(),
              name: user.name,
              email: user.email,
              role: "resident",
            }
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
}


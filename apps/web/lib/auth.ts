import { PrismaClient } from "@repo/db/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

const prisma = new PrismaClient();

export interface AuthCredentials {
    name : string,
    email : string,
    password : string,
    number : string
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                name: { label: "Name", type: "text", placeholder: "Example" },
                number: { label: "Phone Number", type: "text", placeholder: "98765432210" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials: AuthCredentials | undefined) {

                if(!credentials){
                    console.log("Credentials not provided")
                    return null;
                }

                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                console.log("hashedPassword")
                const existingUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                        number: credentials.number
                    }
                })
                console.log(existingUser);

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    console.log(passwordValidation)
                    if (passwordValidation) {
                        let user = {}
                        return user = {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                            number: existingUser.number
                        }
                    }
                    return null;
                }

                try {
                    const newUser = await prisma.user.create({
                        data: {
                            email: credentials.email,
                            name: credentials.name,
                            number: credentials.number,
                            password: hashedPassword
                        }
                    })
                    console.log(newUser);
                    let user = {}
                    return user = {
                        id: newUser.id.toString(),
                        name: newUser.name,
                        number: newUser.number,
                        email : newUser.email
                    }
                } catch (e) {
                    console.log(e);
                    return null;
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: { token: JWT, session: Session }) {
            if (session.user) {
                session.user.id = token.sub
            }
            return session
        }
    }
}

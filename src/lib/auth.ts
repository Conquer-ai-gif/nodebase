import {checkout,polar,portal} from "@polar-sh/better-auth"
import { betterAuth, success } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
// import { PrismaClient } from "@/generated/prisma/client";
import prisma from "@/lib/db";
import { polarClient } from "./polar";

// const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword:{
        enabled:true,
        autoSignIn:true,
    },
    plugins:[
        polar({
            client: polarClient,
            createCustomerOnSignUp:true,
            use:[
                checkout({
                    products:[
                        {
                            productId: "922298b1-28a3-46ae-afc5-dacef2f59119",
                            slug: "pro"
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL || "http://localhost:3000/success",
                    authenticatedUsersOnly:true,
                }),
                portal()
            ]
        })
    ]
});
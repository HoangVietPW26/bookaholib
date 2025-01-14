'use server'
import { db } from "@/database/drizzle"
import { eq } from "drizzle-orm"
import {users} from "@/database/schema"
import {hash} from "bcryptjs"
import { signIn } from "@/auth"
import { headers } from "next/headers"
import ratelimit from "../rate-limit"
import { redirect } from "next/navigation"
import { workflowClient } from "../workflow"
import config from "../config"


export const signInWithCredentials = async(params: Pick<AuthCredentials, "email" | "password">) => {
    console.log(params)
    
    const ip = (await headers()).get('x-forwarded-for') || "127.0.0.1"
    const {success} = await ratelimit.limit(ip)

    if (!success) return redirect("/too-fast")

    const {email , password} = params
    try {
        const result = await signIn('credentials', {
            email, password, redirect: false
        })
        if (result?.error){
            return {success: false, error: result.error}
        } ;
        return {success: true}
    } catch (error) {
        console.log(error, 'Sign In error')
        return {success: false, error: 'Sign In error'}
    }
}

export const signUp = async (params: AuthCredentials) => {
    console.log(params)
    const {fullname, email, universityId, password, universityCard} = params

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)
    if (existingUser.length > 0) {
        return  {success: false, error: "User already exist"}
    }

    const hashedPassword  = await hash(password, 10)

    try {
        await db.insert(users).values({
            fullname,
            email,
            universityId,
            password: hashedPassword,
            universityCard
        })

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
            body: {
                email,
                fullname
            }
        })

        await signInWithCredentials({email, password})

        return {success: true}
    } catch (error) {
        console.log(error, 'SignUp error')
        return {success: false, error: "Sign Up error"}
    }
}
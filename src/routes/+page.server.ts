import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { prisma } from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";
export const load: PageServerLoad = async ({locals}) => {
    const {session, user} = await locals.auth.validateUser();
    if(!session) throw redirect(302,"/login");
    try {
        let chats = await prisma.chats.findMany();
        chats = chats.filter(chat => chat.userId !== user.userId)
        return {user, chats}
    } catch (error) {
     console.log(error)   
    }
    return {
        user
    }
}

export const actions: Actions = {
    default: async ({request, locals})=> {
        const {message} = Object.fromEntries(await request.formData()) as Record<string, string>
        const {user, session} = await locals.auth.validateUser()
        if (!user) return fail(400)
        try {
            const chat = await prisma.chats.create({
                data: {
                    message,
                    username: user.username,
                    userId: user.userId
                }
            })
        } catch (error) {
            
        }
    }
}
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({locals}) =>{
    const {session} = await locals.auth.validateUser()
    if(session) throw redirect(302,'/')
    return {}
}
export const actions: Actions = {
    default: async ({request, locals})=> {
        const {username, password} = Object.fromEntries(await request.formData()) as Record<string, string>

        try {
            const key = await auth.useKey("username", username, password)
            const session = await auth.createSession(key.userId)
            locals.auth.setSession(session)
        } catch (error) {
            return fail(400)
        }
    }
}
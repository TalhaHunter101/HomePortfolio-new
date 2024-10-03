"use client"
import pb from "@/lib/pocketbase";



export const loginWithPassword = async ({email, password}) => {
    try {
        console.log("email", email, "password", password);
        const authData = await pb.collection('users').authWithPassword(email, password);
        pb.authStore.save(authData);
        return authData.record;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Invalid email or password'+error };
    }
}
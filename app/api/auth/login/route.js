// pages/api/auth/login.js
import { NextResponse } from 'next/server';
import pb from '../../../../lib/pocketbase';
import { cookies } from 'next/headers';

export async function POST(request) {
        const { email, password } = await request.json();

        try {
            const authData = await pb.collection('users').authWithPassword(email, password);
            pb.authStore.save(authData);
            cookies().set("pb_auth", pb.authStore.exportToCookie());
            return NextResponse.json({ success: true, token: authData.token, user: authData.record });
        } catch (error) {
            return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
        }
}

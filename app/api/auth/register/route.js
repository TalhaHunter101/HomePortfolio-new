// pages/api/auth/register.js
import { NextResponse } from 'next/server';
import pb from '../../../../lib/pocketbase';

export async function POST(request) {
        const { email, password, passwordConfirm } = await request.json();

        try {
            const newUser = await pb.collection('users').create({
                email,
                password,
                passwordConfirm,
            });

            return NextResponse.json({ success: true, message: 'User registered successfully', user: newUser }, { status: 201 });

        } catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    } 



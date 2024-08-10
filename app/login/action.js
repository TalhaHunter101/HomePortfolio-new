// app/login/action.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod';
import { createClient } from '../../utils/supabase/server'
import toast from 'react-hot-toast';

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') ,
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { success: false, message: 'Invalid credentials' };
    // redirect('/error')
  }

  revalidatePath('/dashboard', 'layout')
  return { success: true, message: 'Logged in successfully' };
  // redirect('/dashboard')
}


const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .regex(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character (!@#$%^&*)' }),
});

export async function signup(formData) {
  const supabase = createClient();

  // Extract and validate form data
  const authdata = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    signupSchema.parse(authdata);

    const { data, error } = await supabase.auth.signUp(authdata);



    console.log("Data", data);
    console.log("Error", error);

    if (error) {
      toast.error(error.message);
      console.error("Signup Error", error); // Log detailed error information
      return { success: false, message: error };
    }

    return { success: true };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed.',
        errors: error.errors.map((e) => e.message),
      };
    } else {
      console.error("Unexpected Error", error); // Log unexpected errors
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  }
}

export async function logout() {
  const supabase = createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}

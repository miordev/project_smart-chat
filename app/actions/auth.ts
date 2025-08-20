"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const SigninFormSchema = z.strictObject({
  username: z.string().trim(),
  password: z.string().trim(),
});

export type SigninFormState = {
  error?: string;
};

export const signin = async (
  state: SigninFormState,
  formData: FormData
): Promise<SigninFormState> => {
  const validatedFields = SigninFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: "Username and password are required",
    };
  }

  const { username, password } = validatedFields.data;

  if (
    username !== process.env.DEMO_USERNAME &&
    password !== process.env.DEMO_PASSWORD
  ) {
    return {
      error: "Invalid username or password",
    };
  }

  await createSession({ username });

  redirect("/chat");
};

export type SignoutFormState = {
  error?: string;
};

export const signout = async (): Promise<SignoutFormState> => {
  try {
    await deleteSession();
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred while logging out",
    };
  }

  redirect("/");
};

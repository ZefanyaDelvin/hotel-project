"use server";

import { cookies } from "next/headers";

const loginAction = async (email: string, password: string) => {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.error || "Login failed");
  }

  cookieStore.set("token", result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  cookieStore.set("roleId", String(result.data.roleId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return result.data;
};

export default loginAction;
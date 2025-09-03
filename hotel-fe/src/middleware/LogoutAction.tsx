"use server";

import { cookies } from "next/headers";

const logoutAction = async () => {
  const cookieStore = await cookies();

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  cookieStore.delete("token");
  cookieStore.delete("roleId");

  return { success: true, message: "Logged out successfully" };
}

export default logoutAction
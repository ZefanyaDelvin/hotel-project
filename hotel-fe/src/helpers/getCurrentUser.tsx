"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const roleId = cookieStore.get("roleId")?.value;

  if (!token || !roleId) {
    return null;
  }

  return {
    token,
    roleId: parseInt(roleId),
  };
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  return user;
}

export async function requireRole(allowedRoles: number[]) {
  const user = await requireAuth();
  
  if (!allowedRoles.includes(user.roleId)) {
    throw new Error("Forbidden: Insufficient permissions");
  }
  
  return user;
}
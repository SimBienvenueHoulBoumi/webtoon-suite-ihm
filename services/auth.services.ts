"use server";

import { cookies } from "next/headers";

export const login = async (username: string, password: string) => {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.API_HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { access_token } = await response.json();
    cookieStore.set("access_token", access_token);
    return true;
  }

  return false;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  return true;
};

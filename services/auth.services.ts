"use server";

import { cookies } from "next/headers";

export const login = async (username: string, password: string) => {
  const response = await fetch(`${process.env.API_HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { access_token } = await response.json();
    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return true;
  }

  return false;
};

export const register = async (username: string, password: string) => {
  const response = await fetch(`${process.env.API_HOST}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    return true;
  }

  return false;
};




export const logout = async () => {
  const cookieStore = await cookies();
  await cookieStore.delete("access_token");
  return true;
};

export const getTokenValue = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
};

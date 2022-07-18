import { useState } from "react";
import { useCookies } from "react-cookie";

const APIPOINT = `https://localhost:3333/login/session_id`;

export const authcheck = async (cookies_id) => {
  const token = cookies_id;
  const response = await (
    await fetch(APIPOINT, {
      method: "POST",
      body: JSON.stringify({
        user: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log("authcheck TF");

  if (response.result === "ok") {
    console.log("true returned");
    return true;
  } else return false;
}

import { useState } from "react";
import { useCookies } from "react-cookie";

const APIPOINT = `https://localhost:3333/login/session_id`;

export const authCheck = (async () => {
  const [nickname, setNickname] = useState(" ");
  const [cookies, removeCookie] = useCookies(["id"]);

  console.log('hoiiiiiii');

  const token = cookies.id;
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

  console.log("authcheck TF", cookies.nickname);

  if (response.result === "ok") {
    console.log("true returned");
    return true;
  } else return false;
}, []);

export const A = ['A','B'];
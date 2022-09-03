import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "/styles/MypageRoot.module.css";
import Link from "../../utils/ActiveLink";
import { loginPoint } from "../../toServer/API-AccessPoint";
import styles2 from "/styles/logintest.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  isLoginAction,
  idAction,
  nicknameAction,
  selectIslogin,
  selectId,
  selectNickname,
} from "../../store/auth";

export default function MypageGroupEntering({fetchData}) {
  //use selelsmdandkandkan mypage sdaasdkjaldna;sdjckandda abcasdas nickname

  const nickname = useSelector(selectNickname);
  const master_id = useSelector(selectId);

  const [identifier, setIdentifier] = useState();
  const [group_password, setGroup_password] = useState();

  const groupEntering = async () => {
    const date = new Date().toISOString();
    console.log(date);

    const response = await fetch("https://localhost:3333/mypage/groupEntering", {
        method: "POST",
        body: JSON.stringify({
            master_id, identifier, group_password, date
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });

    // const data = await response.json();

    let status = response.status;
    if (status === 200) {
      console.log('response', response);
      console.log('200');
      console.log(response.message)

      fetchData();

    } else if (status === 404) {
      alert('404 error');
      console.log('404');
    } else if (status === 400) {
      alert('400 error');
      console.log('400');
    } else if (status === 400) {
      alert('409 error');
      console.log('409');
    } else if (status === 500) {
      alert('500 error');
      console.log('500');
    }
  };

  const handleIdentifierInput = (e) => {
    setIdentifier(e.target.value);
    console.log(identifier);
  }

  const handlePasswordInput = (e) => {
    setGroup_password(e.target.value);
    console.log(group_password);
  }

  return (
    <>
      <div className={styles.addDeviceContainer}>
        <a style={{ paddingLeft: 50, paddingTop: 10, color: "black" }}>
          Entering to Group
        </a>
      </div>

        <span>
            초대 링크 <input onChange={handleIdentifierInput} placeholder="Invite link"/> <br />
            그룹 패스워드 <input onChange={handlePasswordInput} type="password" placeholder="Password" /> <br />
            <input onClick={groupEntering} style={{ marginTop: 0 }} type="submit" value="Entering to group" />
        </span>
    </>
  );
}

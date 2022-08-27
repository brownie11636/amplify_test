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

export default function MypageCreateGroup({fetchData}) {
  //use selelsmdandkandkan mypage sdaasdkjaldna;sdjckandda abcasdas nickname

  const nickname = useSelector(selectNickname);
  const master_id = useSelector(selectId);

  const [group_nickname, setGroup_nickname] = useState();
  const [group_password, setGroup_password] = useState();

  const createGroup = async () => {
    const response = await fetch("https://localhost:3333/mypage/addGroup", {
        method: "POST",
        body: JSON.stringify({
            master_id, group_nickname, group_password
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

      fetchData();

    } else if (status === 404) {
      alert('404 error');
      console.log('404');
    } else if (status === 400) {
      alert('400 error');
      console.log('400');
    } else if (status === 500) {
      alert('500 error');
      console.log('500');
    }
  };

  const handleInput = (e) => {
    setGroup_nickname(e.target.value);
    console.log(group_nickname);
  }

  const handlePasswordInput = (e) => {
    setGroup_password(e.target.value);
    console.log(group_password);
  }

  return (
    <>
      <div className={styles.addDeviceContainer}>
        <a style={{ paddingLeft: 50, paddingTop: 10, color: "black" }}>
          Group Create
        </a>
      </div>

        <span>
            그룹 이름 <input onChange={handleInput} placeholder="Group Name"/> <br />
            그룹 패스워드 <input onChange={handlePasswordInput} type="password" placeholder="Password" /> <br />
            <input onClick={createGroup} style={{ marginTop: 0 }} type="submit" value="Createa Group" />
        </span>
    </>
  );
}

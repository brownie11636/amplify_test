import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "/styles/MypageRoot.module.css";
import Link from "../../utils/ActiveLink";
import { loginPoint } from "../../toServer/API-AccessPoint";

const { v4: uuidv4 } = require("uuid");

import { useDispatch, useSelector } from "react-redux";
import {
  isLoginAction,
  idAction,
  nicknameAction,
  selectIslogin,
  selectId,
  selectNickname,
} from "../../store/auth";

export default function MypageGroupList( {setGpList, inviteCode}) {
    //하ㅏㅏ졸려 뒤지겠네 ....ㅇㄶㄴㅁㅎㅇㅇㅎ
  const [cookies, setCookie] = useCookies(['id', 'nickname']);


  const nickname = useSelector(selectNickname);
  const [deviceList, setDeviceList] = useState([]);
  const [mygroupsList, setMygroupsList] = useState([]);
  const [group_id, setGroup_id] = useState("");
  const user_id = useSelector(selectId);

  async function fetchData() {
    //deviceList
    const user_id = cookies.id; // 0827 edit by joonik. refresh 하면 redux state가 정상적으로 로드되지 않는 문제 때문에 일단은 쿠키로 대체

    let response = await fetch("https://localhost:3333/mypage/groupList", {
      method: "POST",
      body: JSON.stringify({
        user_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    let status = response.status;
    if (status === 200) {
      setMygroupsList(data);
      if(setGpList != null)
      {
        setGpList(data);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.addDeviceContainer}>
        <a style={{ paddingLeft: 50, paddingTop: 10, color: "black" }}>
          내가 속한 그룹 리스트
        </a>
      </div>
      <div>
        <ul>
          {mygroupsList.map((item) => (
            <li value={item.group_id} key={item.group_id}>
              [Master] {item.master_nickname} - [Group Name] {item.group_nickname}
              {inviteCode
              ?<div onClick={() => {inviteCode(item.group_id);}} > 초대 링크 만들기</div>
              : null} 
            </li>
          ))}
        </ul>
      </div>      
    </>
  );
}

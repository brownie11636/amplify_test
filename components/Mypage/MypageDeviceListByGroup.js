import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "/styles/MypageRoot.module.css";
import Link from "../../utils/ActiveLink";
import { loginPoint } from "../../toServer/API-AccessPoint";
import styles2 from "/styles/logintest.module.css";
import MypageCreateGroup from "../../components/Mypage/MypageCreateGroup";
import MypageGroupEntering from "../../components/Mypage/MypageGroupEntering";
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

export default function MypageDeviceListByGroup( {groupID}) {
  //use selelsmdandkandkan mypage sdaasdkjaldna;sdjckandda abcasdas nickname
  const [cookies, setCookie] = useCookies(['id', 'nickname']);


  const nickname = useSelector(selectNickname);
  const [deviceList, setDeviceList] = useState([]);
  const [mygroupsList, setMygroupsList] = useState([]);
  const [cautionMessage, setCautionMessage] = useState("");
  const user_id = useSelector(selectId);

  async function fetchData() {

    const group_id = groupID;
    console.log('api groupid?', group_id);

    let response = await fetch("https://localhost:3333/mypage/groupDeviceList", {
      method: "POST",
      body: JSON.stringify({
        group_id
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    let status = response.status;
    if (status === 200) {
      console.log(data);
      setDeviceList(data);
      // setMygroupsList(data);
      setCautionMessage("");
    }
    else if (status === 404) {
      console.log(status);
      setDeviceList([]);
      setCautionMessage("해당 그룹에는 등록된 디바이스가 없습니다."); 
    }
    else {
      alert('sometings wrong!');
      console.log('status?', status);
      setCautionMessage("무언가 에러가 있습니다."); 
    }
  }

  useEffect(() => {
    fetchData();
    }, [groupID]);

  return (
    <>
        <div>
            <ul>
            {deviceList.map((item) => (
                <li value={item.device_id} key={item.device_id}>
                [device_name] {item.device_name} - [device_type] {item.device_type} 
                </li>
            ))}
            </ul>
            {cautionMessage}           
        </div>
    </>
  )
}

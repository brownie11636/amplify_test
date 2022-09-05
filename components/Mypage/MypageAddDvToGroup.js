import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "/styles/MypageRoot.module.css";
import Link from "../../utils/ActiveLink";
import { loginPoint } from "../../toServer/API-AccessPoint";
import styles2 from "/styles/logintest.module.css";
import MypageCreateGroup from "./MypageCreateGroup";
import MypageGroupEntering from "./MypageGroupEntering";
import MypageDeviceListByGroup from "./MypageDeviceListByGroup";

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

export default function MypageAddDvToGroup( {dvList, gpList}) {
  const [cookies, setCookie] = useCookies(['id', 'nickname']);
  const nickname = useSelector(selectNickname);
  const [group_id, setGroup_id] = useState("");
  const user_id = useSelector(selectId);

  useEffect(() => {
  }, []);

  async function addDevicesToGroup() {
    //deviceList
    let response = await fetch("https://localhost:3333/mypage/addDevices2Group", {
      method: "POST",
      body: JSON.stringify({
        group_id, devices
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log('data?', data);
    let status = response.status;
    if (status === 200) {
      alert('그룹에 디바이스 추가 완료!');
      // setDeviceList(data);
      // setMygroupsList(data);
    }
    else {
      alert('sometings wrong!');
      console.log('status?', status);
    }
  }

  const handleSelect = (e) => {
    console.log(e.target.value);
    setGroup_id(e.target.value);
  };
  
  return (
    <>
      <div>
        디바이스
        <select onChange={handleSelect} value={group_id}>
          {dvList.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        를 그룹
        <select onChange={handleSelect} value={group_id}>
          {gpList.map((item) => (
            <option value={item.group_id} key={item.group_id}>
              {item.group_nickname}
            </option>
          ))}
        </select>
        에
        <input
          onClick={addDevicesToGroup}
          style={{ marginTop: 0 }}
          type="submit"
          value="추가"
        />
      </div>
    </>
  );
}

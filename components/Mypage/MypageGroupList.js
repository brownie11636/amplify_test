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

export default function MypageGroupList( {checkedList}) {
  //use selelsmdandkandkan mypage sdaasdkjaldna;sdjckandda abcasdas nickname

  //let checkedList = props.checkedList;
  let devices = checkedList;

  const nickname = useSelector(selectNickname);
  const [deviceList, setDeviceList] = useState({});
  const [mygroupsList, setMygroupsList] = useState([]);
  const [group_id, setGroup_id] = useState("");
  const user_id = useSelector(selectId);

  useEffect(() => {
    async function fetchData() {
      //deviceList
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
        setDeviceList(data);
        setMygroupsList(data);
      }
    }
    fetchData();
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
      // setDeviceList(data);
      // setMygroupsList(data);
    }
  }

  const groupComponents = [];
  for (const key in mygroupsList) {
    groupComponents.push(
      <li>
        <span>Master User : {mygroupsList[key].master_nickname} / </span>
        <span>Group Name : {mygroupsList[key].group_nickname}</span>
        <p onClick={inviteCode}>초대 링크 만들기</p>
      </li>
    );
  }

  const handleSelect = (e) => {
    console.log(e.target.value);
    setGroup_id(e.target.value);
  };

  const inviteCode = () => {
    console.log('invite code 구현중...', mygroupsList);
  };

  return (
    <>
      <div className={styles.addDeviceContainer}>
        <a style={{ paddingLeft: 50, paddingTop: 10, color: "black" }}>
          내가 속한 그룹 리스트
        </a>
      </div>
      <div>
        <ul>
          {groupComponents}{" "}
        </ul>
      </div>
      <div>
        <select onChange={handleSelect} value={group_id}>
          {mygroupsList.map((item) => (
            <option value={item.group_id} key={item.group_id}>
              {item.group_id}
            </option>
          ))}
        </select>
        <input
          onClick={addDevicesToGroup}
          style={{ marginTop: 0 }}
          type="submit"
          value="선택한 디바이스를 그룹에 추가"
        />
        <p onClick={inviteCode}>초대 링크 만들기</p>
      </div>
    </>
  );
}

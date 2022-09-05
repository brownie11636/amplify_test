import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import styles from "/styles/MypageRoot.module.css";
import { loginPoint } from "../../../toServer/API-AccessPoint";
import styles2 from "/styles/logintest.module.css";
import MypageCreateGroup from "../MypageCreateGroup";
import MypageGroupEntering from "../MypageGroupEntering";
import MypageDeviceListByGroup from "../MypageDeviceListByGroup";

const { v4: uuidv4 } = require("uuid");

import { useDispatch, useSelector } from "react-redux";
import {
  isLoginAction,
  idAction,
  nicknameAction,
  selectIslogin,
  selectId,
  selectNickname,
} from "../../../store/auth";

export default function MypageGroupList( {checkedList, viewOption}) {
  //use selelsmdandkandkan mypage sdaasdkjaldna;sdjckandda abcasdas nickname
  const [cookies, setCookie] = useCookies(['id', 'nickname']);
  console.log('viewoption?', viewOption);

  //let checkedList = props.checkedList;
  let devices = checkedList;

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
    }
  }

  useEffect(() => {
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
      alert('그룹에 디바이스 추가 완료!');
      // setDeviceList(data);
      // setMygroupsList(data);
    }
    else {
      alert('sometings wrong!');
      console.log('status?', status);
    }
  }


  async function selectGroup() {
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
      alert('해당 그룹의 디바이스 리스트 불러오기 성공!');
      console.log(data);
      setDeviceList(data);
      // setMygroupsList(data);
    }
    else if (status === 404) {
      console.log(status);
      alert('해당 그룹에는 등록된 디바이스가 없음');
      setDeviceList([]);
    }
    else {
      alert('sometings wrong!');
      console.log('status?', status);
    }

  }

  // const groupComponents = [];
  // for (const key in mygroupsList) {
  //   groupComponents.push(
  //     <>
  //     <li>
  //       <span>Master User : {mygroupsList[key].master_nickname} / </span>
  //       <span>Group Name : {mygroupsList[key].group_nickname}</span>
  //       <p onClick={inviteCode}>초대 링크 만들기</p>
  //     </li>
  //     </>
  //   );
  // }

  const handleSelect = (e) => {
    console.log(e.target.value);
    setGroup_id(e.target.value);
  };

  const inviteCode = async (groupId) => {
    
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const expiration = date.toISOString();
    const identifier = uuidv4();

    let response = await fetch("https://localhost:3333/mypage/createGroupInviteLink", {
      method: "POST",
      body: JSON.stringify({
        groupId, expiration, identifier
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log('data?', data);
    let status = response.status;
    if (status === 200) {
      alert("초대링크 생성 완료: " + identifier);
    }
    else {
      alert('somethings wrong!');
    }
  };
  
  if (viewOption === 'all')
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
              <div onClick={() => {inviteCode(item.group_id);}} > 초대 링크 만들기</div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <select onChange={handleSelect} value={group_id}>
          {mygroupsList.map((item) => (
            <option value={item.group_id} key={item.group_id}>
              {item.group_nickname}
            </option>
          ))}
        </select>
        <input
          onClick={addDevicesToGroup}
          style={{ marginTop: 0 }}
          type="submit"
          value="선택한 디바이스를 그룹에 추가"
        />
      </div>
      <MypageCreateGroup fetchData={fetchData}/>
      <MypageGroupEntering fetchData={fetchData}/>
    </>
  );
  else if (viewOption === 'useDevice')
  return (
    <>
      <div className={styles.addDeviceContainer}>
        <a style={{ paddingLeft: 50, paddingTop: 10, color: "black" }}>
          디바이스 사용하기
        </a>
      </div>
      <div>
        <ul>
          {mygroupsList.map((item) => (
            <li value={item.group_id} key={item.group_id}>
              [Master] {item.master_nickname} - [Group Name] {item.group_nickname} 
            </li>
          ))}
        </ul>
      </div>
      <div>
        그룹 선택 --- 
        <select onChange={handleSelect} value={group_id}>
          {mygroupsList.map((item) => (
            <option value={item.group_id} key={item.group_id}>
              {item.group_nickname}
            </option>
          ))}
        </select>
        {/* <input
          onClick={selectGroup}
          style={{ marginTop: 0 }}
          type="submit"
          value="그룹 선택"
        /> */}
      </div>
      {/* <div>
        <ul>
          {deviceList.map((item) => (
            <li value={item.device_id} key={item.device_id}>
              [device_name] {item.device_name} - [device_type] {item.device_type} 
            </li>
          ))}
        </ul>
      </div> */}
      <MypageDeviceListByGroup groupID={group_id}/>
    </>
  )
}

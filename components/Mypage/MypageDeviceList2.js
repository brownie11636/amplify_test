import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import styles from "/styles/MypageRoot.module.css"
import Link from '../../utils/ActiveLink';
import { loginPoint } from "../../toServer/API-AccessPoint";

import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../../store/auth";
import MypageGroupList from "./MypageGroupList";


export default function MypageDeviceList2() {
    const id = useSelector(selectId);
    const nickname = useSelector(selectNickname);

    const [deviceList, setDeviceList] = useState([]);
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let response = await fetch("https://localhost:3333/mypage/deviceList_async", {
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log('fetch data?', data);
            let status = response.status;
            if (status === 200) {
                setDeviceList(data);
            }
        }
        fetchData();
        console.log('deviceList?2', deviceList);
    }, []);


    const deviceComponents = [];
    for (const key in deviceList) {
        deviceComponents.push(
            <li>
                <span input type="checkbox">Device name: {deviceList[key].name} / </span>
                <span>Device type: {deviceList[key].type}</span>
            </li>
        );
    }

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
        console.log('checked?', checked);
      };

    return(
        <>
        <div>
        {deviceList.map((item) => (
            <div key={item.id}>
              <div>
              <input onChange={handleCheck} value={item.id} type="checkbox" />
              <span>{item.name} : {item.type}</span>
              </div>
            </div>
         ))}
         </div>
        <MypageGroupList checkedList={checked}/>

         </>
    );

    
} 

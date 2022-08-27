import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import styles from "/styles/MypageRoot.module.css"
import Link from '../../utils/ActiveLink';
import { loginPoint } from "../../toServer/API-AccessPoint";

import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../../store/auth";
import MypageGroupList from "./MypageGroupList";
import MypageCreateGroup from "../../components/Mypage/MypageCreateGroup";


export default function MypageDeviceList2() {
    const id = useSelector(selectId);
    const nickname = useSelector(selectNickname);
    const [cookies, setCookie] = useCookies(['id', 'nickname']);

    const [deviceList, setDeviceList] = useState([]);
    const [checked, setChecked] = useState([]);
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

    useEffect(() => {
        const id = cookies.id; // 0827 edit by joonik. refresh 하면 redux state가 정상적으로 로드되지 않는 문제 때문에 일단은 쿠키로 대체

        // async function fetchData() {
        //     let response = await fetch("https://localhost:3333/mypage/deviceList_async", {
        //         method: "POST",
        //         body: JSON.stringify({
        //             id,
        //         }),
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     });
        //     const data = await response.json();
        //     console.log('fetch data?', data);
        //     let status = response.status;
        //     if (status === 200) {
        //         setDeviceList(data);
        //     }
        // }
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
              <span>NAME: {item.name} | TYPE: {item.type}</span>
              </div>
            </div>
         ))}
         </div>
        <MypageGroupList checkedList={checked}/>
         </>
    );

    
} 

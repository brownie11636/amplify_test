import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import styles from "/styles/MypageRoot.module.css"
import Link from '../../utils/ActiveLink';
import { loginPoint } from "../../toServer/API-AccessPoint";

import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../../store/auth";

export default function MypageDeviceList() {
    const id = useSelector(selectId);
    const nickname = useSelector(selectNickname);

    const [deviceList, setDeviceList] = useState({});

    useEffect(() => {
        async function fetchData() {
            let response = await fetch("https://localhost:3333/mypage/deviceList", {
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data);
            let status = response.status;
            if (status === 200) {
                setDeviceList(data);
            }
        }
        fetchData();
    }, []);

    const deviceComponents = [];
    for (const key in deviceList) {
        deviceComponents.push(
            <li>
                <span>Device name: {deviceList[key].name} / </span>
                <span>Device type: {deviceList[key].type}</span>
            </li>
        );
    }

    return(
        <ul>
            {deviceComponents}
        </ul>
    );
} 

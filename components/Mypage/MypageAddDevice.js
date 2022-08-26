import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import styles from "/styles/logintest.module.css"
import Link from '../../utils/ActiveLink';
import { loginPoint } from "../../toServer/API-AccessPoint";

import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../../store/auth";

export default function MypageAddDeviceContainer() {
    const master_id = useSelector(selectId);
    const [deviceName, setdeviceName] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("black");

    const onChangedeviceName = (event) => {
        setdeviceName(event.target.value);
    };

    console.log('masterid?', master_id);

    const addDevice = async () => {
        const response = await fetch("https://localhost:3333/mypage/addDevice", {
            method: "POST",
            body: JSON.stringify({
                master_id, deviceName
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        // const data = await response.json();

        let status = response.status;
        if (status === 200) {
            setMessage("디바이스 등록 성공!");
            setMessageColor("green");
        } else if (status === 404) {
            setMessage("디바이스가 존재하지 않습니다.");
            setMessageColor("red");
        } else if (status === 400) {
            setMessage("이미 등록된 디바이스입니다.");
            setMessageColor("red"); 
        }
    }

    return(
        <div style={{display:"flex", flexDirection:"column", width: "80%", backgroundColor: "#bbbbbb", alignItems: "center", justifyContent: "center", height: 100}}>
            <div style={{display:"flex", flexDirection:"row", width: "100%", alignItems: "center", justifyContent: "center"}}>
                <div className={styles.login_id} style={{width:"60%", marginTop: 0}}>
                    <input value={deviceName} onChange={onChangedeviceName} style = {{marginTop: 0}} type="text" placeholder="Device Nickname" />
                </div>
                <div className={styles.submit} style={{width:"20%", marginTop: 0}}>
                    <input onClick={addDevice} style = {{marginTop: 0}} type="submit" value="submit" />
                </div>
            </div>
            <span style={{color: messageColor}}>{message}</span>
        </div>
    );
} 

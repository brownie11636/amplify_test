import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
import styles from "/styles/MypageRoot.module.css"
import Link from '../../utils/ActiveLink';
import { loginPoint } from "../../toServer/API-AccessPoint";

import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../../store/auth";

export default function MypageAddDeviceContainer() {

    const nickname = useSelector(selectNickname);
        
    return(
        <div className={styles.addDeviceContainer}>
            <Link href="/mypage">
                <a style={{paddingLeft: 50, paddingTop: 10, color: "black"}}>{nickname}님의 디바이스</a>
            </Link> 
            <Link href="/mypage/addDevice">
                <a className={styles.addDevice}>+</a>
            </Link>
        </div>
    );
} 

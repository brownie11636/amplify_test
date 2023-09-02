import { React, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Router from "next/router";

import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../store/auth";

export default function LogOut() {
    const dispatch = useDispatch();

    const [cookies, removeCookie] = useCookies(['id','nickname']);
    
    const logout = async() => { //세션삭제, 쿠키삭제? 서버쪽 세션 destroy에 대해서 지식이 부족함.. 설계맞는지?
        removeCookie('id');
        removeCookie('nickname')
        // dispatch(isLoginAction(false));
        // dispatch(idAction(""));
        // dispatch(nicknameAction(""));
    }


    useEffect(() => {
        logout();
        Router.push("/");
    }, []);

    return (
        <div>
            logout!
        </div>
    )
}

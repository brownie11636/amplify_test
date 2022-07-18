import { React, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Router from "next/router";



export default function LogOut() {

    const [cookies, removeCookie] = useCookies(['id']);
    
    const logout = async() => { //세션삭제, 쿠키삭제? 서버쪽 세션 destroy에 대해서 지식이 부족함.. 설계맞는지?
        removeCookie('id');
        const response = await fetch("https://localhost:3333/login/session", {method: "DELETE"});
        console.log('logout response from server : ', response);
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

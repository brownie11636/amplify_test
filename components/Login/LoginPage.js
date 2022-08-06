import { React, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Router from "next/router";
import styles from "/styles/logintest.module.css"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    async function loginSubmit() {

        let response = await fetch("https://localhost:3333/login/session", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let status = response.status;
        if (status === 200) {
            window.location.href = "/";
        } else if (status === 400) {
            document.querySelector("span.message").innerHTML = "잘못된 비밀번호입니다.";
            document.querySelector("span.message").style.color = "red";                
        } else if (status === 404) {
            document.querySelector("span.message").innerHTML = "유저가 존재하지 않습니다";
            document.querySelector("span.message").style.color = "red";                
        } else if (status === 500) {
            document.querySelector("span.message").innerHTML = "서버에 에러가 발생했습니다";
            document.querySelector("span.message").style.color = "red";                
        } else {
            document.querySelector("span.message").innerHTML = "알 수 없는 오류가 발생했습니다";
            document.querySelector("span.message").style.color = "red";      
        }
    }

    return (
        <div className={styles.wrap}>
        <div className={styles.login}>
            <h1>Log-In</h1>
            <h5>Welcome to Portal301!</h5>
            <div className={styles.login_sns}>
            <li><a href=""><i className="fab fa-instagram"></i></a></li>
            <li><a href=""><i className="fab fa-facebook-f"></i></a></li>
            <li><a href=""><i className="fab fa-twitter"></i></a></li>
            </div>
            <div className={styles.login_id}>
                <h4>E-mail</h4>
                <input value={email} onChange={onChangeEmail} type="email" placeholder="Email" />
            </div>
            <div className={styles.login_id}>
                <h4>Password</h4>
                <input value={password} onChange={onChangePassword} type="password" placeholder="Password" />
            </div>
            <div className={styles.login_etc}>

                <div className={styles.login_pw}>
                <a href="">Forgot Password?</a>
            </div>
            </div>
            <div className={styles.submit}>
                <input type="submit" value="submit" onClick={loginSubmit}/>
                <span class="message">이메일과 비밀번호를 입력해주세요</span>
            </div>
        </div>
    </div>
    );
}
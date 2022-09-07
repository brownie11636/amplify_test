import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
//import styles from "/styles/logintest.module.css"
import styles from "/styles/login2.module.css"
import Link from '../../utils/ActiveLink';
import { loginPoint } from "../../toServer/API-AccessPoint";


export default function LoginComponent() {

    const router = useRouter();
    const [cookies, setCookie] = useCookies(['id']);
    const [message, setMessage] = useState("이메일과 비밀번호를 입력해주세요");
    const [messageColor, setMessageColor] = useState("black");
    const [email, setEmail] = useState("");
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const [password, setPassword] = useState("");
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onKeyPress = (e) => {
        if(e.key=='Enter') {
            loginSubmit();
        }
    }

    async function loginSubmit() {
        console.log('loginSubmit func');
        //https://api.portal301.com/login/session
        const response = await fetch("https://localhost:3333/login/session", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();

        let status = response.status;
        if (status === 200) {
            console.log(data);
            setCookie('id', data.id,  {maxAge: 2000});
            setCookie('nickname', data.nickname,  {maxAge: 2000});
            router.push("/");
        } else if (status === 400) {
            setMessage("잘못된 비밀번호입니다.");
            setMessageColor("red");
        } else if (status === 404) {
            setMessage("유저가 존재하지 않습니다");
            setMessageColor("red");                
        } else if (status === 500) {
            setMessage("서버에 에러가 발생했습니다");
            setMessageColor("red");
        } else {
            setMessage("알 수 없는 오류가 발생했습니다");
            setMessageColor("red");
        }
    }

    return(

        <div className={styles.wrap}>
            <div className={styles.login}>
                <h1>Welcome to Portal301 !</h1>
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

                <div className={styles.submit}>
                    <span style={{color: messageColor}}>{message}</span>
                    <br></br>
                    <input type="submit" onKeyPress={onKeyPress} value="submit" onClick={loginSubmit}/>
                </div>
                <div className={styles.login_etc}>
                    <Link href="/" activeClassName="active">
                        <a style={{marginRight: 10}}>Forgot Password?</a>
                    </Link>
                    <Link href="/registration" activeClassName="active">
                        <a >Create New Account</a>
                    </Link>
                </div>
            </div>
        </div>
    );
} 

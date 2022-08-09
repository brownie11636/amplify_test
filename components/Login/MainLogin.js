import { React, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Router from "next/router";
import { authcheck } from "../../service/authcheck";
import { loginPoint } from "../../service/API-AccessPoint";
import styles from "../../styles/Login.module.css";

const MainLogin = () => {

    const [isLogin,setIsLogin] = useState(false);
    const [cookies, setCookie] = useCookies(['id'],['nickname']);
    const [emailtext, setEmailtext] = useState("");
    const [pwtext, setPwtext] = useState("");


    //console.log('authch?',authcheck(13));
    
    // useEffect(() => {
    //   authCheck().then((v)=>setIsLogin(v));
    // }, [authCheck]);
  
    useEffect(() => {
        authcheck(cookies.id).then((v)=>setIsLogin(v));
        console.log('isis-000?', authcheck(cookies.id).then((v)=> {return v}))
        console.log('isis?',isLogin);
        if(isLogin === true) {
            Router.push("/")
        }
    }, [isLogin]);
  
    const emailInput = (event) => {
      setEmailtext(event.target.value);
      //console.log(text);
    };  
    const pwInput = (event) => {
      setPwtext(event.target.value);
      //console.log(text);
    };
  
    const onButtonClick = async () => { //쿠키 작업 on. 근데 쿠키는 보안상 이슈가 있을수도? 언젠가는 JWT 사용하자
    
      const response = await(await fetch(loginPoint, {
        method: "POST",
        body: JSON.stringify({
            email: emailtext,
            password: pwtext
        }),
        headers: {
            "Content-Type": "application/json"
        }
      })).json();
  
      if(response.result === 'ok') {
        console.log("result from server : ", response.result);
        //console.log("data?", response.text());
        //response.text().then(data=>console.log(data))
        //setNickname(response.nickname)
        Router.push("/")
        setCookie('id', response.user); // 쿠키 저장
        setCookie('nickname', response.nickname);
        console.log('cookies saved, ->', cookies)
      }
      else {
        console.log("result from server : ", response.result);
      }
    };
  
    const oneClickLogin = async () => { // 즉시 로그인 임시 버튼. 개발용.
    
      const response = await(await fetch("https://localhost:3333/login/session", {
        method: "POST",
        body: JSON.stringify({
            email: 'omybell201@gmail.com',
            password: '2285cjstk!'
        }),
        headers: {
            "Content-Type": "application/json"
        }
      })).json();
  
      if(response.result === 'ok') {
        console.log("result from server : ", response.result);
        //console.log("data?", response.text());
        //response.text().then(data=>console.log(data))
        //setNickname(response.nickname)
        Router.push("/")
        setCookie('id', response.user); // 쿠키 저장
        setCookie('nickname', response.nickname);
      }
      else {
        console.log("result from server : ", response.result);
      }
    };
  
    if(isLogin === false)
    return (
      <div className={styles.div.root}>
        <a href="/" className={styles.logo}></a>
        <div className={styles.main_container}>
          <h1>Welcome to portal301!</h1>
          <div className={styles.login_container}>
            <div className={styles.input_container}>
              <input className={styles.box} onChange={emailInput} value={emailtext} type="email" placeholder="이메일" class="id"></input>
              <input className={styles.box} onChange={pwInput} value={pwtext} type="password" placeholder="비밀번호" class="pw"></input>
            </div>
            <button className={styles.button} onClick={onButtonClick}>로그인</button>
            {/* <button onClick={oneClickLogin}>바로 로그인(개발용)</button> */}
          </div>
          <span className={styles.message}>이메일과 비밀번호를 입력해주세요</span>
        </div>
        <a href="/registration" className={styles.registration_toggle}>
          회원가입
        </a>
      </div>
    )
    else return <div></div>;
}

export default MainLogin
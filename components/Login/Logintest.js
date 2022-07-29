import { React, useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import Router from "next/router";
import styles from "/styles/logintest.module.css"

const Logintest = () => {

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
                <input type="email" name="" id="" placeholder="Email" />
            </div>
            <div className={styles.login_id}>
                <h4>Password</h4>
                <input type="password" name="" id="" placeholder="Password" />
            </div>
            <div className={styles.login_etc}>

                <div className={styles.login_pw}>
                <a href="">Forgot Password?</a>
            </div>
            </div>
            <div className={styles.submit}>
                <input type="submit" value="submit" />
            </div>
        </div>
    </div>
    );
}

export default Logintest
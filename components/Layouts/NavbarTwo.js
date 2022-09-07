import React, { Component, useState, useEffect, useRef } from 'react';
import Link from '../../utils/ActiveLink';
import { useCookies } from 'react-cookie';
import {useDispatch, useSelector} from "react-redux";
import {isLoginAction, idAction, nicknameAction, selectIslogin, selectId, selectNickname} from "../../store/auth";

export default function Navbar() {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(selectIslogin);
    const isSignIn = useRef();
    const nickname = useSelector(selectNickname);

    const [collapsed, setCollapsed] = useState(true)
    let _isMounted = false;

    const [cookies, setCookie] = useCookies(['id', 'nickname']);
    
    // Navbar
    const toggleNavbar = () => {
        setCollapsed((currnet) => {return !currnet})
    }

    useEffect(() => {

        console.log('cookies.id:',cookies.id);

        if(cookies.id === 'undefined') {
            console.log('aaaaaaaaa', typeof(cookies.id));
        }

        if (cookies.id === undefined || cookies.id === 'undefined') {
            console.log('cookies.id222', cookies.id);
            isSignIn.current = false;
            dispatch(isLoginAction(false));
            dispatch(idAction(""));
            dispatch(nicknameAction(""));
        } else {
            console.log('cookies.id111', cookies.id);
            isSignIn.current = true;
            dispatch(isLoginAction(true));
            dispatch(idAction(cookies.id));
            dispatch(nicknameAction(cookies.nickname));
        }

        console.log('is?', isSignIn.current);

        let elementId = document.getElementById("navbar");
        elementId.classList.add("is-sticky");
        return () => {
            _isMounted = false;
        };
    }, []);
    
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';


        return (
            <>
               <div id="navbar" className="navbar-area">
                    <div className="main-nav">
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <img src="/images/main_logo3.png" className="main-logo" alt="logo" />
                                        <img src="/images/main_logo3.png" className="optional-logo" alt="logo" />
                                    </a>
                                </Link>

                                <button 
                                    onClick={toggleNavbar} 
                                    className={classTwo}
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target="#navbarSupportedContent" 
                                    aria-controls="navbarSupportedContent" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar top-bar"></span>
                                    <span className="icon-bar middle-bar"></span>
                                    <span className="icon-bar bottom-bar"></span>
                                </button>

                                <div className={classOne} id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                                    <Link href="/" activeClassName="active">
                                                        <a className="nav-link">Home</a>
                                                    </Link>
                                        </li>

                                        <li className="nav-item">
                                                    <Link href="/about" activeClassName="active">
                                                        <a className="nav-link">About Us</a>
                                                    </Link>
                                        </li>

                                        <li className="nav-item">
                                                    <Link href="/services" activeClassName="active">
                                                        <a className="nav-link">Services</a>
                                                    </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/contact" activeClassName="active">
                                                <a className="nav-link">Contact</a>
                                            </Link>
                                        </li>

                                        {isSignIn.current === false
                                        ?
                                        <li className="nav-item">
                                        <Link href="/registration" activeClassName="active">
                                            <a className="nav-link">Registration</a>
                                        </Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <Link href="/mypage" activeClassName="active">
                                                <a className="nav-link">{nickname}님</a>
                                            </Link>
                                        </li>}

                                        {isSignIn.current === false
                                        ? 
                                        <li className="nav-item">
                                            <Link href="/login" activeClassName="active">
                                                <a className="nav-link">Log In</a>
                                            </Link>
                                        </li>
                                        :
                                        <li className="nav-item">
                                            <Link href="/logout" activeClassName="active">
                                                <a className="nav-link">Log Out</a>
                                            </Link>
                                        </li>}
                                    </ul>
                                    <div className="others-options">
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    
}

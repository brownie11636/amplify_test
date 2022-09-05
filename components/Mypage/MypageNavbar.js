import React, { Component, useState, useEffect } from 'react';
import Link from '../../utils/ActiveLink';
import { useRouter } from "next/router";
import styles from "/styles/MypageNavbar.module.css"

export default function MypageNavbar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <div className={styles.container}>
            <div className={styles.linkContainer}>
                <Link href="/mypage">
                    <a className={currentRoute === "/mypage" 
                        ? styles.active
                        : styles.nonActive}>
                        내 디바이스 관리
                    </a>
                </Link>
            </div>
            <div className={styles.linkContainer}>
                <Link href="/mypage/group">
                    <a className={currentRoute === "/mypage/group_n" 
                        ? styles.active
                        : styles.nonActive}>
                        디바이스 그룹관리
                    </a>
                </Link>
            </div>           
            <div className={styles.linkContainer}>
                <Link href="/mypage/useDevice">
                    <a className={currentRoute === "/mypage/useDevice_n" 
                        ? styles.active
                        : styles.nonActive}>
                        디바이스 사용하기
                    </a>
                </Link>
            </div>           

        </div>
    );
}

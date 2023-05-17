import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "/styles/registrationTest.module.css";

export default function RegistrationRoot() {
  const router = useRouter();
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [password2Message, setPassword2Message] = useState("");

  const [emailMessageColor, setEmailMessageColor] = useState("red");
  const [nicknameMessageColor, setNicknameMessageColor] = useState("red");
  const [passwordMessageColor, setPasswordMessageColor] = useState("red");
  const [password2MessageColor, setPassword2MessageColor] = useState("red");

  const [email, setEmail] = useState("");
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    if (email) {
      if (!isEmailReg(email)) {
        setIsEmail(false);
        setEmailMessage("이메일 형식에 맞게 입력해주세요");
        setEmailMessageColor("red");
      } else {
        setIsEmail(true);
      }
    }
  }, [email]);

  useEffect(() => {
    if (isEmail) {
      const handler = setTimeout(async () => {
        let response = await fetch("https://localhost:3333/registration/email-check", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let status = response.status;
        if (status === 200) {
          setEmailMessage("사용 가능한 이메일입니다.");
          setEmailCheck(true);
          setEmailMessageColor("green");
        } else if (status === 409) {
          setEmailMessage("이미 사용중인 이메일입니다.");
          setEmailCheck(false);
          setEmailMessageColor("red");
        } else if (status === 500) {
          setEmailMessage("서버에 에러가 발생했습니다");
          setEmailCheck(false);
          setEmailMessageColor("red");
        } else {
          setEmailMessage("알 수 없는 오류가 발생했습니다");
          setEmailCheck(false);
          setEmailMessageColor("red");
        }
      }, 50);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [email, isEmail]);

  const [nickname, setNickname] = useState("");
  const onChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  useEffect(() => {
    if (nickname) {
      if (!isNicknameReg(nickname)) {
        setIsNickname(false);
        setNicknameMessage("닉네임은 5~20자 영문자 또는 숫자이어야 합니다.");
        setNicknameMessageColor("red");
      } else {
        setIsNickname(true);
      }
    }
  }, [nickname]);

  useEffect(() => {
    if (isNickname) {
      const handler = setTimeout(async () => {
        let response = await fetch("https://localhost:3333/registration/nickname-check", {
          method: "POST",
          body: JSON.stringify({
            nickname,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        let status = response.status;
        if (status === 200) {
          setNicknameMessage("사용 가능한 닉네임입니다.");
          setNicknameCheck(true);
          setNicknameMessageColor("green");
        } else if (status === 409) {
          setNicknameMessage("이미 사용중인 닉네임입니다.");
          setNicknameCheck(false);
          setNicknameMessageColor("red");
        } else if (status === 500) {
          setNicknameMessage("서버에 에러가 발생했습니다");
          setNicknameCheck(false);
          setNicknameMessageColor("red");
        } else {
          setNicknameMessage("알 수 없는 오류가 발생했습니다");
          setNicknameCheck(false);
          setNicknameMessageColor("red");
        }
      }, 50);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [nickname, isNickname]);

  const [password, setPassword] = useState("");
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const [password2, setPassword2] = useState("");
  const onChangePassword2 = (event) => {
    setPassword2(event.target.value);
  };

  useEffect(() => {
    if (password) {
      if (!isPasswordReg(password)) {
        setIsPassword(false);
        setPasswordMessage(
          "비밀번호는 영문/숫자/특수문자(!@#$%^&*)를 포함하여 8~16자로 입력해야합니다."
        );
        setPasswordMessageColor("red");
      } else {
        setIsPassword(true);
        setPasswordMessage("사용 가능한 비밀번호입니다");
        setPasswordMessageColor("green");
      }
    }
  }, [password, password2]);

  useEffect(() => {
    if (password2) {
      if (password === password2) {
        setPasswordCheck(true);
        setPassword2Message("비밀번호가 동일합니다.");
        setPassword2MessageColor("green");
      } else {
        setPasswordCheck(false);
        setPassword2Message("비밀번호가 동일하지 않습니다.");
        setPassword2MessageColor("red");
      }
    }
  }, [password, password2]);

  function isEmailReg(email) {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  }

  function isNicknameReg(nickname) {
    var reg = /^[a-z0-9]+[a-z0-9]{4,19}$/g;
    return reg.test(nickname);
  }

  function isPasswordReg(password) {
    var reg = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
    return reg.test(password);
  }

  async function registrationSubmit() {
    if (isEmail && isNickname && isPassword && emailCheck && nicknameCheck && passwordCheck) {
      const response = await fetch("https://localhost:3333/registration/add", {
        method: "POST",
        body: JSON.stringify({
          email,
          nickname,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      if (status === 200) {
        router.push("/");
      } else {
        console.log("server issue");
      }
    } else {
      alert("Somethings wrong!");
      return;
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.login}>
        <h1>Registration</h1>
        <div className={styles.login_id}>
          <h4>E-mail</h4>
          <input value={email} onChange={onChangeEmail} type="email" placeholder="Email" />
        </div>
        <span style={{ color: emailMessageColor }}>{emailMessage}</span>
        <div className={styles.login_id}>
          <h4>Nickname</h4>
          <input value={nickname} onChange={onChangeNickname} type="text" placeholder="Nickname" />
        </div>
        <span style={{ color: nicknameMessageColor }}>{nicknameMessage}</span>
        <div className={styles.login_id}>
          <h4>Password</h4>
          <input
            value={password}
            onChange={onChangePassword}
            type="password"
            placeholder="Password"
          />
        </div>
        <span style={{ color: passwordMessageColor }}>{passwordMessage}</span>
        <div className={styles.login_id}>
          <h4>Password check</h4>
          <input
            value={password2}
            onChange={onChangePassword2}
            type="password"
            placeholder="Password check"
          />
        </div>
        <span style={{ color: password2MessageColor }}>{password2Message}</span>
        <div className={styles.submit}>
          <input type="submit" value="submit" onClick={registrationSubmit} />
        </div>
      </div>
    </div>
  );
}

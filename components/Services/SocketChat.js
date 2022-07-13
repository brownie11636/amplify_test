import styles from "../../styles/Chat.module.css";


import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket, SocketContext } from "../../service/socket";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { authCheck } from "../../service/authcheck";

const SocketChat = ( { roomID } ) => {
    const [isLogin,setIsLogin] = useState(true);
    const [text, setText] = useState("");
    const [chat, setChat] = useState([]);
    const [cookies, setCookie] = useCookies(['roomID']);

    //const navigate = useNavigate();
    setCookie('roomID', roomID);

    
    useEffect(() => {
      socket.connect();
      console.log('in sock compo roomID?', cookies.roomID , '\n', roomID);
      if (roomID != undefined) {
        console.log('if in');
        socket.emit("join-room", roomID, 'dummy-nick');
      }
      else if (roomID == undefined){
        console.log('else if in');
        socket.emit("join-room", cookies.roomID, 'dummy-nick');
      }
      else {
        console.log('somethings wrong!');
      }
      //setCookie('user', nickname);
      //socket.emit("join-room", roomID, cookies.nickname);
      //socket.emit("join-room", cookies.roomID, 'dummy-nick');
      return () => {
        // App 컴포넌트 unmount시 실행
        console.log('unmounted');
        socket.disconnect();
      };
    }, []);
  
    // useEffect(() => {
    //   // edit by joonik ... async로 수정 필요할수도 있음. 아마 필요할듯?
    //   if (isLogin === true) {
    //     console.log("authcheck success, good");
    //     socket.emit("join-room", roomId, cookies.nickname);
    //     console.log('roomID:',roomId);
  
    //   } else {
    //     alert("로그인이 필요합니다.");
    //     navigate("/");
    //     console.log("authcheck fail, 로그인 필요");
    //   }
    // },[isLogin, cookies.nickname, navigate, roomId]);
  
    const textInput = (event) => {
      setText(event.target.value);
      console.log(text);
    };
  
    const sendOnClick = () => {
      if (text.length !== 0) {
        console.log("none zero");
        //socket2.emit("test", text);
        socket.emit("message", text);
        //socket.emit("message", text.value);
        setText("");
      } else {
        console.log("text length is zero");
      }
    };
  
    socket.on("createMessage", (message, userName) => {
      console.log('create msg!');
      setChat([...chat,{userName,message}]);
    });
    const renderChat =()=>{
      return chat.map(({userName, message},index)=>(
        <div className={styles.message} key={index}>
          <h3>{userName}:<span>{message}</span></h3>
        </div>
      ))
    };

  return (
    <SocketContext.Provider value={socket}>
    <div>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.header__back}>
              <i className="styles.fas fa-angle-left"></i>
            </div>
            <h3>Socket Chat</h3>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.main__left}>
            <div className={styles.videos__group}>
              <p style={{ color: "white" }}>Graphs will be here soon!</p>
              <div id={styles.video_grid}></div>
            </div>
            <div className={styles.options}>
              <div className={styles.options__left}>
                <div
                  id={styles.downloadButton}
                  className={styles.options__button}
                >
                  <i className="fa-solid fa-download"></i>
                </div>
                <div
                  id={styles.questionButton}
                  className={styles.options__button}
                >
                  <i className="fa-solid fa-circle-question"></i>
                </div>
                <div id={styles.showChat} className={styles.options__button}>
                  <i className="fa fa-comment"></i>
                </div>
              </div>
              <div className={styles.options__right}>
                <div
                  id={styles.inviteButton}
                  className={styles.options__button}
                >
                  <i className="fas fa-user-plus"></i>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.main__right}>
            <div className={styles.main__chat_window}>
              <div className={styles.messages}>

              {renderChat()}

              </div>
            </div>
            <div className={styles.main__message_container}>
              <input
                onChange={textInput}
                value={text}
                id={styles.chat_message}
                type="text"
                autoComplete="off"
                placeholder="Type message here..."
              ></input>
              <div
                onClick={sendOnClick}
                id={styles.send}
                className={styles.options__button}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SocketContext.Provider>
  )
}

export default SocketChat
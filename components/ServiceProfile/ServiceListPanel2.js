import React, {useState, useRef, useEffect} from 'react';
import ServiceProfileCard2 from './ServiceProfileCard';
import io from "socket.io-client";

export default function ServiceListPanel2(props) {

    const [list, setList] = useState([]);
    const onProfileSelect = (profile) => {
        props.onProfileSelect(profile);
        console.log(profile);
    }

    const fetchList = async() => {

        console.log('Fetch Service-Profile List from portal301 Database');

        let response = await fetch("https://localhost:3333/rtc/allServiceProfile")
        const data = await response.json();

        let status = response.status;
        if (status === 200) {
          console.log(data);
          setList(data);
        }
        else if (status === 404)
        {
          console.log('somethings err from server');
        }
    }


    //const socket = props.socket;
    useEffect(() => {
        fetchList();    
      }, []);
    

    // const onProfileSelect = (profile)=>{
    //     props.onProfileSelect(profile)
    // }
    
    // // console.log("profile list")
    // // console.log(props.profileList)

    const profileListComponents = [];
    for(const profile of list){
        profileListComponents.push(<ServiceProfileCard2 key={Math.random()} onSelect={onProfileSelect} profile={profile} />)
    }

    return (
        // <section className="scroll-area bg-f2f6f9 ptb-110">
        <div className="scroll-area">
            <div className="container">
                <h3>Select Service Profile</h3>
                <div className="row">
                    {profileListComponents}
                </div>
            </div>
        </div>
    );
}

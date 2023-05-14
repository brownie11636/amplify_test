import React, { useEffect, useRef, useState } from "react";
import Socket from "../../../components/Socket/Socket";
import 'bootstrap/dist/css/bootstrap.css';


export const Test = () => {

    const [targetProfile, setTargetProfile] = useState({});
    const [profileList, setProfileList] = useState([]);


    const handleSelect = (e) => {
        console.log(targetProfile.sid);
        console.log(e.target.value);
        setTargetProfile(e.target.value)
    };

    return (
        <div>Hello</div>
        // <Socket setProfileList={setProfileList}>

            // Hello, Im Test Component!
            // <div class="col-md-4">
            //     <select class="form-control" style={{ width: '400px' }} onChange={handleSelect} value={targetProfile}>
            //         {profileList.map((item) => (
            //             <option value={item.sid} key={item.sid}>
            //                 {item.sid}
            //             </option>
            //         ))}
            //     </select>
            // </div>

            // {/* <button type="button" class="btn btn-primary" onClick={createOffer}>Join Streaming</button>
            // <button type="button" class="btn btn-primary" onClick={debugcode}>console debug</button> */}


        // </Socket>
    );
};

export default Test;

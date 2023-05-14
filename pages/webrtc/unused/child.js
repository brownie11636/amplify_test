import React, { useState, useContext, useCallback, useEffect } from 'react';
import { emitHandler, SocketContext, onHandelr } from '../../../components/Socket/Socket';

export const Child = () => {

    // const socket = useContext(SocketContext);

    // socket.on('echo', function (msg) {
    //     console.log("echo msg:" + msg);
    // });

    const check = () => {
        // console.log(returnV);
    }



    return (
        <div onClick={check}>
            hello Im child!
        </div>
    );
};

export default Child;
import { SocketContext, socket, emitHandler, sendMessage } from '../../../components/Socket/Socket';
import { Child } from './child';

export const Test2 = () => {

    emitHandler('echo');

    return (
        <>
            <SocketContext.Provider value={socket}>
                <Child />
            </SocketContext.Provider>
        </>
    );
};

export default Test2;
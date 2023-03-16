module.exports = (socketio) => {

    const readEcho = function (payload) {
        const socket = this;
        console.log('module exports readEcho! >>', payload);
    };

    return {
        readEcho,
    };

}
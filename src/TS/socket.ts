import { io } from "socket.io-client";

const { REACT_APP_HOSTNAME, REACT_APP_LOCAL, REACT_APP_SOCKET } = process.env;
const socketHostname =
    REACT_APP_SOCKET === "production" ? REACT_APP_HOSTNAME : REACT_APP_LOCAL;

const IO = io(socketHostname as string);

IO.on("connect_error", (err) => {
    console.log(err.toString());
});

export default IO;

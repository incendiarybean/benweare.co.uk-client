import { io } from "socket.io-client";

const { REACT_APP_HOSTNAME, REACT_APP_LOCAL, NODE_ENV } = process.env;
const socketHostname =
    NODE_ENV === "production" ? REACT_APP_HOSTNAME : REACT_APP_LOCAL;

const IO = io(socketHostname as string);

IO.on("connect_error", (err) => {
    console.log(err.toString());
});

export default IO;

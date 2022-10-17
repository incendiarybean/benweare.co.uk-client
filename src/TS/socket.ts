import { io } from "socket.io-client";

const IO = io();

IO.on("connect_error", (err) => {
    console.log(err.toString());
});

export default IO;

import { IO } from "..";

const socketHandler = () => {
    IO.on("connection", () => {
        IO.use((socket, next) => {
            if (
                !socket.handshake.auth.token ||
                socket.handshake.auth.token !== process.env.SOCKET_TOKEN
            ) {
                console.log(
                    `[${new Date()}] Request received without SOCKET_KEY.`
                );
                return next(new Error("Missing Authentication Token"));
            }
            next();
        });
        console.log("USER_CONNECTED");
    });
};

export default socketHandler;

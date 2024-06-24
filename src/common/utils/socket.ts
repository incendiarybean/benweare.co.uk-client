import { io } from 'socket.io-client';

/**
 * Connect to the default socket on the webserver.
 */
const IO = io();

export default IO;

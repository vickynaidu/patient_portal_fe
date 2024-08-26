import { io, Socket } from "socket.io-client";
import { CHAT_URL } from "../common/api";

class SocketService {
    private socket: Socket | null = null;

    connect(namespace: string = CHAT_URL): Promise<Socket> {
        return new Promise((resolve, reject) => {
            this.socket = io(`http://192.168.29.92:5000/${namespace}`);

            if (!this.socket) {
                return reject(new Error("Socket connection failed"));
            }

            this.socket.on("connect", () => {
                //console.log("Connected to WebSocket server");
                resolve(this.socket!);
            });

            this.socket.on("connect_error", (err) => {
                console.error("Connection error:", err);
                reject(err);
            });
        });
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            //console.log("Disconnected from WebSocket server");
        }
    }

    on(event: string, callback: (data: any) => void) {
        //console.log(event, ", ", callback);
        this.socket?.on(event, callback);
    }

    emit(event: string, to: string, data: any) {
        //console.log("Emiting", data, " on ", event, " to ", to);
        this.socket?.emit(event, {to, message: data});
    }

    getSocket() {
        return this.socket;
    }
}

export default new SocketService();

import axios from 'axios';
import { io } from 'socket.io-client';


const BackendBaseURL = 'http://localhost:5000/api';

const BackendBaseUrl = "http://localhost:5000/api";
const APIBaseUrl = "http://localhost:5000/api";

const API =axios.create (
    {
        baseURL: APIBaseUrl
    }
);
export const registerUser = ( username ) =>
    API.post("/auth/register", { username });

export const getRooms = () => API.get("/rooms");
export const createRoom = ( roomName ) =>
    API.post("/rooms", { roomName });
export const getMessages = ( roomId ) => API.get (`/rooms/${roomId}/messages`);

export const socket = io(BackendBaseURL, {autoconnect: false});
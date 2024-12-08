import { io } from "socket.io-client";
import URLS from "./URLS";

const API_URL = URLS.API_URL;

// Create a new socket connection to the server
const socket = io(API_URL); // Replace with your backend URL

export default socket;

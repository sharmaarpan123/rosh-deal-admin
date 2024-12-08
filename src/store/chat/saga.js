import { put, takeEvery } from "redux-saga/effects";
import socket from "../socket";  // Import the socket
import { addMessage } from "../redux/actions";

function* listenForMessages() {
  socket.on("message", (message) => {
    yield put(addMessage(message));
  });
}

function* sendMessageSaga(action) {
  try {
    socket.emit("sendMessage", action.payload);
  } catch (error) {
    console.error("Error sending message", error);
  }
}

function* watchSendMessage() {
  yield takeEvery("chat/sendMessage", sendMessageSaga);
}

export default function* chatSaga() {
  yield all([listenForMessages(), watchSendMessage()]);
}

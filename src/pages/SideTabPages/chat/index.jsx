import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../../store/chat/action";
import socket from "../../../services/socket";

const ChatPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        sender: "You",
        timestamp: new Date().toISOString(),
      };

      socket.emit("sendMessage", message);
      dispatch(addMessage(message));
      setNewMessage("");
    }
  };
  console.log(messages, "messagecheck", newMessage);

  return (
    <>
      <section className="chatPage position-relative py-4">
        <Container>
          <Row>
            <Col lg="12" className="my-2">
              <Card>
                <Card.Header as="h5">Chat</Card.Header>
                <Card.Body>
                  <ListGroup
                    variant="flush"
                    style={{ maxHeight: "300px", overflowY: "scroll" }}
                  >
                    {messages.map((msg, index) => (
                      <ListGroup.Item key={index}>
                        <strong>{msg.sender}:</strong> {msg.text}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Form.Group className="mt-3" controlId="messageInput">
                    <Form.Control
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={handleSendMessage}
                    className="mt-2"
                  >
                    Send
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ChatPage;

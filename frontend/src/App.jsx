import { useState } from "react";
import { useRecoilState } from "recoil";
import { socketAtom } from "./state/atom";

const App = () => {
  const [inputFieldEmail, setInputFieldEmail] = useState("");
  const [inputFieldPassword, setInputFieldPassword] = useState("");
  const [socket, setSocket] = useRecoilState(socketAtom);

  const [inputFieldMssg, setInputFieldMssg] = useState("");
  const [mssg, setMssg] = useState("");

  async function handleSignin() {
    // email and password
    // fetch request to the server

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputFieldEmail,
          password: inputFieldPassword,
        }),
      });

      const data = await response.json(); // all the data is in the form of json

      if (!response.ok) {
        throw new Error(data.message || `HTTP error status: ${data.status}`);
      }

      // if there is no error then we will get a token
      const token = await data.token;
      console.log("Message: ", data.message, " token: ", token);

      // after this we will be making the ws connection
      connectWebSocket(token);
    } catch (err) {
      console.log(err);
    }
  }

  async function connectWebSocket(token) {
    // fetch request where token is a params
    const ws = new WebSocket(`ws://localhost:3000?token=${token}`);
    ws.onopen = () => {
      console.log("connection is upgraded to ws");
      setSocket(ws);
    };
    ws.onerror = (error) => {
      console.log(error);
    };
    ws.onclose = () => {
      console.log("connection is closed!!!  ");
    };
    ws.onmessage = (event) => {
      setMssg(event.data);
    };
  }

  return (
    <div>
      <h1>WEB-CHAT</h1>
      <h3>AUTHENTICATE</h3>
      <div>
        <input
          type="text"
          placeholder="email..."
          value={inputFieldEmail}
          onChange={({ target: { value } }) => {
            setInputFieldEmail(value);
          }}
        />
        <input
          type="text"
          placeholder="password..."
          value={inputFieldPassword}
          onChange={({ target: { value } }) => {
            setInputFieldPassword(value);
          }}
        />
        <button
          onClick={() => {
            handleSignin();
          }}
        >
          verify
        </button>
      </div>
      <div>
        <input
          type="text"
          value={inputFieldMssg}
          onChange={({ target: { value } }) => {
            setInputFieldMssg(value);
          }}
        />
        <button
          onClick={() => {
            socket.send(inputFieldMssg);
          }}
        >
          send
        </button>
      </div>
      <div>{mssg}</div>
    </div>
  );
};

export default App;

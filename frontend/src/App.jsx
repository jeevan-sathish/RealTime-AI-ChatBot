import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.open = () => {
      console.log("connected to server");
    };

    ws.onmessage = (event) => {
      console.log("server says", event.data);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    socket.send(message);
  };
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}></button>
    </div>
  );
};

export default App;

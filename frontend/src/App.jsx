import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [chat, setChat] = useState([]);

  const ws = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");

    ws.current.onopen = () => setStatus("Connected");
    ws.current.onclose = () => setStatus("Disconnected");
    ws.current.onerror = () => setStatus("Error");

    ws.current.onmessage = (event) => {
      setChat((prev) => {
        const updated = [...prev];
        if (updated.length && updated[updated.length - 1].loading) {
          updated.pop();
        }
        updated.push({ role: "bot", text: event.data });
        return updated;
      });
    };

    return () => ws.current.close();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = () => {
    if (!query.trim()) return;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setChat((prev) => [
        ...prev,
        { role: "user", text: query },
        { role: "bot", text: "Typing...", loading: true },
      ]);

      ws.current.send(query);
      setQuery("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#555" }}>{status}</h3>

      <div
        style={{
          height: "400px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "15px",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                background: msg.role === "user" ? "#4CAF50" : "#e5e5ea",
                color: msg.role === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "70%",
                fontSize: "14px",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            marginLeft: "10px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#4CAF50",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;

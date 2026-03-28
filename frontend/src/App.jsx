import React, { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const data = "30+10";

  async function handleResponse() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data }),
      });
      const result = await res.json();
      setMessage(result.message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>this is where the clculation ui goes</h1>
      <button onClick={handleResponse}>calculate</button>
      <h1>result:{message}</h1>
    </div>
  );
};

export default App;

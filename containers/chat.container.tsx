"use client";

import React from "react";

export const Chat = () => {
  const [response, setResponse] = React.useState("No Response");

  React.useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({
          input:
            "What is this YouTube video about? https://www.youtube.com/watch?v=XqZsoesa55w",
        }),
      });
      const data = await response.json();
      console.log("data", data);
      setResponse(data.content);
    };
    fetchResponse();
  }, []);

  return (
    <div>
      <div>ChatContainer</div>
      <div>{response}</div>
    </div>
  );
};

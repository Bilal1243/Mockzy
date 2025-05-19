import React, { useEffect, useState } from "react";

const MockzyLoader = () => {
  const [text, setText] = useState("");
  const fullText = "Mockzyyy";
  const speed = 150; // typing speed in ms

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        setTimeout(() => {
          index = 0;
          setText("");
        }, 800);
      }
    }, speed);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <h1 className="text-4xl font-extrabold text-black tracking-widest animate-pulse">
        {text}
        <span className="border-l-2 border-black ml-1 animate-blink" />
      </h1>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1 }
            50% { opacity: 0 }
          }
          .animate-blink {
            animation: blink 1s step-start infinite;
          }
        `}
      </style>
    </div>
  );
};

export default MockzyLoader;

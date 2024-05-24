import React from "react";

function Loading() {
  return (
    <div className="message-container">
      <div className="message-box">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
}

export default Loading;

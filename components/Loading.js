import React from "react";
import useI18n from "../hooks/useI18n";
function Loading() {
  const { common: t } = useI18n();
  return (
    <div className="base-container">
      <div className="message-box">
        <div className="spinner"></div>
        <p>{t.loading}</p>
      </div>
    </div>
  );
}

export default Loading;

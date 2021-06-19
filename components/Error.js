import React from "react";
import useI18n from "../hooks/useI18n";
function Error() {
  const { common: t } = useI18n();
  return (
    <div className="base-container">
      <div className="message-box">
        <h3 className="message-header">Disculpas</h3>
        <p>{t.error}</p>
      </div>
    </div>
  );
}

export default Error;

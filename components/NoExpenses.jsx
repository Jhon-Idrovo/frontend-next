import React from "react";
import useI18n from "../hooks/useI18n";
function NoExpenses() {
  const { noExpenses: t } = useI18n();
  return (
    <div className="base-container">
      <div className="message-box">
        <h3 className="message-header">{t[0]}</h3>
        <p>{t[1]}</p>
      </div>
    </div>
  );
}

export default NoExpenses;

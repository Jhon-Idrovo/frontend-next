import Link from "next/link";

import useI18n from "../hooks/useI18n";
function LogNeeded() {
  const { logNeeded: t } = useI18n();
  return (
    <div className="base-container">
      <div className="message-box">
        <h3 className="message-header">{t[0]}</h3>
        <p className="message">
          {t[1]}{" "}
          <Link href="/login">
            <a>{t[2]}</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogNeeded;

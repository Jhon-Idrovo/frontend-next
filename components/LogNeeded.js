import Link from "next/link";

function LogNeeded() {
  return (
    <div className="container">
      <div className="message-box">
        <h3 className="message-header">Vaya!</h3>
        <p className="message">
          Parece que no te has autentificado, por favor{" "}
          <Link href="/login">
            <a>ingresa aquí</a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogNeeded;

import "../styles/global.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import axiosInstance from "../axios";

function App({ Component, pageProps }) {
  const router = useRouter();
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    setIsLoged(Boolean(localStorage.getItem("access_token")));
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="App for tracking your expenses" />
        <meta property="og:image" />
        <meta name="og:title" content="Home Finance" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
      </Head>

      <nav>
        <div className="first-line">
          <label className="logo">Home Finance</label>
          <ul className="extras">
            <li className="list-item">
              {!isLoged ? (
                <Link
                  href="/login/"
                  className={
                    router.pathname === "/login" ? "upper-active" : "upper-btn"
                  }
                >
                  <a>Login</a>
                </Link>
              ) : (
                // <Button
                //   onClick={async () => {
                //     const r = await axiosInstance.post("api/logout", {
                //       refresh_token: localStorage.getItem("refresh_token"),
                //     });
                //     if (r.status !== 202) throw Error(r.statusText);
                //     // localStorage.clear();
                //     // router.re
                //   }}
                //   className={
                //     router.pathname === "/logout" ? "upper-active" : "upper-btn"
                //   }
                // >
                //   Logout
                // </Button>
                <Link href="/">
                  <a>Logout</a>
                </Link>
              )}
            </li>
            {/* <li className="list-item">
              <Link
                href="/config"
                className={
                  router.pathname === "/config" ? "upper-active" : "upper-btn"
                }
              >
                <a>
                  <i className="fas fa-cog"></i>
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
        <ul>
          <li className="list-item">
            <Link href="/save-expenses">
              <a
                className={router.pathname === "/save-expenses" ? "active" : ""}
              >
                Registrar Gasto
              </a>
            </Link>
          </li>
          <li className="list-item">
            <Link href="/statistics">
              <a className={router.pathname === "/statistics" ? "active" : ""}>
                Estadísticas
              </a>
            </Link>
          </li>
          <li className="list-item">
            <Link href="/book">
              <a className={router.pathname === "/book" ? "active" : ""}>
                Gastos
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <Component
        isLoged={isLoged}
        setIsLoged={setIsLoged}
        {...pageProps}
      ></Component>
    </>
  );
}

export default App;

// every page get wrapped by this component, next will search
// for this component to render the whole page

import "../styles/globals.css";

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
    console.log("main app re-rendered");
  }, []);

  const hangleLogout = (e) => {
    e.preventDefault();
    axiosInstance
      .post("api/logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 202) {
          localStorage.removeItem("access_token");
          setIsLoged(false);
        }
      });
  };
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="App for tracking your expenses" />
        <meta property="og:image" />
        <meta name="og:title" content="Home Finance" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,300;1,400;1,500;1,800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
        />
      </Head>

      <nav className="border-0 bg-gradient-to-t from-blue-900 to-gray-900">
        <div className=" flex justify-between ">
          <label className=" text-white font-bold text-xl md:text-4xl m-4">
            Home Finance
          </label>
          <ul className="flex justify-between">
            <li className="p-2">
              {!isLoged ? (
                <Link href="/login/">
                  <a
                    className={
                      "rounded-sm px-1 py-2 " +
                      (router.pathname === "/login" ? "active" : "inactive")
                    }
                  >
                    Login
                  </a>
                </Link>
              ) : (
                <button
                  onClick={hangleLogout}
                  className="rounded-sm px-1 py2 inactive"
                >
                  Logout
                </button>
              )}
            </li>
            <li className="p-2">
              <Link href="/config">
                <a>
                  <i
                    className={
                      "rounded-sm px-1 py-2 fas fa-cog " +
                      (router.pathname === "/config" ? "active" : "inactive")
                    }
                  ></i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex justify-around">
          <li className="flex">
            <Link href="/save-expenses">
              <a
                className={
                  "p-2 rounded-t-sm " +
                  (router.pathname === "/save-expenses" ? "active" : "inactive")
                }
              >
                Registrar Gasto
              </a>
            </Link>
          </li>
          <li className="flex">
            <Link href="/statistics">
              <a
                className={
                  "p-2 rounded-t-sm " +
                  (router.pathname === "/statistics" ? "active" : "inactive")
                }
              >
                Estadísticas
              </a>
            </Link>
          </li>
          <li className="flex">
            <Link href="/book">
              <a
                className={
                  "p-2 rounded-t-sm " +
                  (router.pathname === "/book" ? "active" : "inactive")
                }
              >
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

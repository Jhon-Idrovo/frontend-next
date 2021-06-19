import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useI18n from "../hooks/useI18n";

import axiosInstance from "../axios";

function Login({ isLoged, setIsLoged }) {
  const router = useRouter();
  //i18n
  const t = useI18n();
  const url = "/api/token/";
  const initialState = Object.freeze({
    username: "",
    password: "",
  });
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post(url, form).then((response) => {
      if (response.status === 200) {
        const data = response.data;

        localStorage.setItem("access_token", data["access"]);
        localStorage.setItem("refresh_token", data["refresh"]);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + data["access"];
        setIsLoged(true);
        router.push("/save-expenses");
      } else {
        console.log(response);
      }
    });
  };
  return (
    <div className="base-container ">
      <form className="form">
        <h3 className="font-bold">{t.loginTitle}</h3>
        <input
          type="text"
          name="username"
          id="username"
          className="login-register-input my-2"
          placeholder={t.common.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="login-register-input mb-2"
          placeholder={t.common.password}
          onChange={handleChange}
        />
        <input
          type="submit"
          value={t.loginBtn}
          className="submit-btn"
          onClick={handleSubmit}
        />

        <span className="self-start mt-4 font-semibold ">
          {t.loginFooter[0]}
        </span>
        <span className="self-start font-light">
          {t.loginFooter[1]}{" "}
          <Link href="/register">
            <a>{t.loginFooter[2]}</a>
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;

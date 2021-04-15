import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import axiosInstance from "../axios";

function Login({ isLoged, setIsLoged }) {
  const router = useRouter();
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
      }
    });
  };
  return (
    <div className="container ">
      <form className="form">
        <h3 className="font-bold">INGRESO</h3>
        <input
          type="text"
          name="username"
          id="username"
          className="login-register-input"
          placeholder="Nombre de usuario"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          className="login-register-input"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Ingresar"
          className="submit-btn"
          onClick={handleSubmit}
        />

        <span className="self-start mt-4 font-semibold ">
          No tienes una cuenta aún?
        </span>
        <span className="self-start font-light">
          Empieza a tomar el control de tu dinero presionando{" "}
          <Link href="/register">
            <a>aquí</a>
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;

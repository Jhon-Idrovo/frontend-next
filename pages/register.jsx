import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axiosInstance from "../axios";

function Register() {
  const router = useRouter();

  const initialState = Object.freeze({
    username: "",
    password: "",
  });

  const [form, setForm] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "api/register/";
    axiosInstance
      .post(url, form)
      .then((response) => {
        if (response.status === 201) {
          router.push("/login/");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response) {
          /*the request was made and the server responded 
          but with a status code that falls out of the 
          range of 2xx*/
          const data = err.response.data;
          const errors = [];
          if (data["username"]) {
            errors.push("El nombre de usuario ya existe");
          }
          if (err.response.data["email"]) {
            errors.push("Ingresa un email valido");
          }
          setErrorMessage(errors);
        } else if (err.request) {
          /*The request was made but no response was received*/
          console.log(err);
        } else {
          //something went wrong making the request
          console.log(err.message);
        }
        // setErrorMessage();
      });
  };
  return (
    <div className="form-container">
      <form className="form">
        <h3 className="form-title">REGISTRO</h3>
        <ul id="error-msgs">
          {errorMessage &&
            errorMessage.map((msg) => {
              return <li>{msg}</li>;
            })}
        </ul>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nombre de usuario"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Crear Cuenta"
          className="submit-btn"
          onClick={handleSubmit}
        />
        <p>
          Ya tienes una cuenta?{" "}
          <Link href="/login">
            <a>Ingresa aquí</a>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

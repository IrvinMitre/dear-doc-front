import React, { useState } from "react";
import style from "../../styles/login.module.css";
import { UserService } from "@/app/services/users/userService";
import { useRouter, redirect } from "next/navigation";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const myService = new UserService();
      await myService.login(username, password);
      router.push("/listPokemons");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={style.input}
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={style["login-button"]}
            type="submit"
            disabled={username === "" && password === ""}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
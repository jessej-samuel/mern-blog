import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async (ev) => {
    ev.preventDefault();

    const response = await fetch("http://localhost:4000/register", {
      method: "POST",

      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      alert("Registration failed with code " + response.status);
    }
  };

  return (
    <form className="register">
      <h1>Register</h1>
      <input
        type="text"
        name=""
        id=""
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button onClick={onRegister}>Register</button>
    </form>
  );
}

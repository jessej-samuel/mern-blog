import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const onLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // include cookies from req in browser
    });
    if (res.ok) {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
      setRedirect(true);
    } else {
      alert("wrong creds");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form action="" onSubmit={onLogin} className="login">
      <h1>Login</h1>
      <input
        type="text"
        name=""
        id=""
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
    </form>
  );
}

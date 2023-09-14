import "./App.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      {
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </>
      }
    </UserContextProvider>
  );
}

export default App;

// Finished till 1:42:00

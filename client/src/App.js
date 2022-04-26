import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import CardDetail from "./react/components/CardDetail/CardDetail";
import Home from "./react/components/Home/Home.jsx";
import Landing from "./react/components/Landing/Landing";
import NavBar from "./react/components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/detail/:idProduct"} element={<CardDetail />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

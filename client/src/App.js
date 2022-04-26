import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetail from "./react/components/CardDetail/CardDetail";
import Home from "./react/components/Home/Home.jsx";

function App() {
<<<<<<< HEAD
	return (
		<BrowserRouter>
			<>
				<Routes>
					<Route path={"/"} element={<Home />} />
					<Route path={"/detail/:idProduct"} element={<CardDetail />} />
				</Routes>
			</>
		</BrowserRouter>
	);
=======
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/detail/:idProduct"} element={<CardDetail />} />
        </Routes>
      </>
    </BrowserRouter>
  );
>>>>>>> e34185731dfe7e926896ce08d95d5b0123bdcf26
}

export default App;

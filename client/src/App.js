import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetail from "./react/components/CardDetail/CardDetail";
import Home from "./react/components/Home/Home.jsx";

function App() {
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
}

export default App;

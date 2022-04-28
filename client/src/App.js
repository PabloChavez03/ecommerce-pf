import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import CardDetail from "./react/components/CardDetail/CardDetail";
import Construction from "./react/components/Construction/Construction";
import CreationProduct from "./react/components/CreationProduct/CreationProduct";
import Home from "./react/components/Home/Home.jsx";
import Landing from "./react/components/Landing/Landing";
import NavBar from "./react/components/NavBar/NavBar";

/** Prueba modal */
import PruebaModal from "./react/components/ShoppingCart/PruebaModal";

function App() {
	return (
		<BrowserRouter>
			<>
				<NavBar />
				<Routes>
					<Route path={"/"} element={<Landing />} />
					<Route path={"/home"} element={<Home />} />
					<Route path={"/detail/:idProduct"} element={<CardDetail />} />
					{/* Ruta /creation provisoria para poder ver como esta quedando el formulario. */}
					<Route path={"/creation"} element={<CreationProduct />} />
					<Route path={"/about"} element={<Construction />} />
					<Route path={"/cart"} element={<Construction />} />
					<Route path={"/account"} element={<Construction />} />
					<Route path={"/prueba-modal"} element={<PruebaModal />} />
				</Routes>
			</>
		</BrowserRouter>
	);
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CardDetail from "./react/components/CardDetail/CardDetail";
import Construction from "./react/components/Construction/Construction";
// import CreationProduct from "./react/components/CreationProduct/CreationProduct";
import Home from "./react/components/Home/Home.jsx";
import Landing from "./react/components/Landing/Landing";
import NavBar from "./react/components/NavBar/NavBar";
import ProductCreate from "./react/components/CreationProduct/ProductCreate";
import Footer from "./react/components/Footer/Footer";
import Admin from "./react/AdminComponents/Pages/Admin";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path={"/"} element={<Landing />} />
				<Route path={"/home"} element={<Home />} />
				<Route path={"/detail/:productId"} element={<CardDetail />} />
				<Route path={"/creation"} element={<ProductCreate />} />
				<Route path={"/about"} element={<Construction />} />
				<Route path={"/account"} element={<Construction />} />
				<Route path={"/construction"} element={<Construction />} />
				<Route path={"/admin"} element={<Admin />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;

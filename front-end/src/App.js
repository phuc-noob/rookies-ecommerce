import './assets/styles/App.css';
import { Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "./pages/home/HomeLayout";
import MyFoodsPage from "./pages/foods/MyFoodsPage";
import HomePage from "./pages/home/HomePage";
import AuthPage from './pages/auth/AuthPage';
import OrderPage from './pages/order/OrderPage';
import DetailFoodPage from "./pages/foods/DetailFoodPage";
import OrderDetailPage from './pages/order/OrderDetailPage';
function App() {
	return (
		<Routes>
			<Route path="/login" element={<AuthPage authRoute="login" />} />
			<Route path="/register" element={<AuthPage authRoute="register" />} />
			<Route path="/" element={<DashboardLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/foods" element={<MyFoodsPage />} />
				<Route path='/carts/my' element={<OrderPage/>} />
				<Route path='/orders/my' element={<OrderDetailPage />} /> 
				<Route path="/foods/:id" element={<DetailFoodPage />} />
			</Route>
		</Routes>
	);
}

export default App;

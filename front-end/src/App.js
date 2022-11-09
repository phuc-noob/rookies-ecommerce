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
import HomeAdminPage from './pages/homeAdmin/HomeAdminPage';
import AdminFoodsPage from './pages/foods/AdminFoodsPage';
import CreateFoodPage from "./pages/foods/CreateFoodPage";
import AdminCategoiesPage from './pages/category/AdminCategoriesPage';
import AdminCustomersPage from './pages/customer/AdminCustomersPage';
import CreateCustomerPage from './pages/customer/CreateCustomerPage';
import UpdateCustomerPage from './pages/customer/UpdateCustomerPage';
import CreateCategoriesPage from './pages/category/CreateCategoriesPage';
import UpdateCategoriesPage from './pages/category/UpdateCategoriesPage';
import UpdateFoodsPage from './pages/foods/UpdateFoodsPage';
import AdminRouteRole from './components/auth/AdminRouteRole';
import UserRouteRole from './components/auth/UserRouteRole';
import OrderHistoryPAge from './pages/order/OrderHistoryPage';
import RatingPage from './pages/rating/RatingPage';
import ForgetPasswordForm from './components/auth/ForgetPasswordForm';

function App() {
	return (
		<Routes>

			<Route path="/login" element={<AuthPage authRoute="login" />} />
			<Route path="/register" element={<AuthPage authRoute="register" />} />
			<Route path="/forget-password" element={<AuthPage authRoute="forget-password"/>} />
			<Route path="/" element={<DashboardLayout />}>
				
				<Route path="/" element={<HomePage />} />
				<Route path="/foods" element={<MyFoodsPage />} />
				<Route path='/carts/my' element={<UserRouteRole> <OrderPage /> </UserRouteRole>} />
				<Route path='/orders/my' element={<UserRouteRole> <OrderDetailPage /> </UserRouteRole>} />
				<Route path='/orders/history' element={<UserRouteRole> <OrderHistoryPAge /> </UserRouteRole>} />
				<Route path='/foods/:id/rating' element={<RatingPage />} />
				<Route path="/foods/:id" element={<DetailFoodPage />} />
			</Route>
			<Route path="/admin" element={<AdminRouteRole> <HomeAdminPage /> </AdminRouteRole>}>

				<Route path="/admin/foods" element={<AdminFoodsPage />} />
				<Route path="/admin/foods/new" element={<CreateFoodPage />} />
				<Route path="/admin/foods/update/:id" element={<UpdateFoodsPage />} />

				<Route path="/admin/categories" element={<AdminCategoiesPage />} />
				<Route path="/admin/categories/new" element={<CreateCategoriesPage />} />
				<Route path="/admin/categories/update/:id" element={<UpdateCategoriesPage />} />

				<Route path="/admin/customers" element={<AdminCustomersPage />} />
				<Route path="/admin/customers/new" element={<CreateCustomerPage />} />
				<Route path="/admin/customers/update/:id" element={<UpdateCustomerPage />} />
			</Route>
		</Routes>
	);
}

export default App;
